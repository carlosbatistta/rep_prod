import { connectToSqlServer } from "../../database/sqlServer";
import { isAuthenticated } from "../../middlewares/isAuthenticated";
import prismaClient from "../../prisma";
import { ValidadeService } from "../util/ValidateService";

interface AddressedStockRequest {
    branch_code: string
    storage_code: string
    date_count: string
    document: number
    address_code?: string
}

export class ImportAddressedStockService {
    async execute({ branch_code, document, storage_code, date_count, address_code }: AddressedStockRequest): Promise<any> {

        await ValidadeService.validateStockDocument(branch_code, storage_code, date_count, document)
        
        try {  

            const pool = await connectToSqlServer()

            let filters: string[] = []

            if (address_code) filters.push("AND D14_ENDER = @address_code")

            const where_clause = `
            WHERE 
                D14010.D_E_L_E_T_ <> '*'
                AND D14_FILIAL = @branch_code
                AND D14_LOCAL = @storage_code
                ${filters.join(" ")} 
            `

            const query_geral = `
            SELECT 
                D14_QTDEST, D14_PRODUT, D14_LOCAL, D14_ENDER, D14_FILIAL,
                SUM(D14_QTDEPR + D14_QTDSPR) AS transf_quantity,
                SUM(D14_QTDPEM + D14_QTDEMP) AS reserve_quantity
            FROM [dbo].[D14010]
            ${where_clause}
            GROUP BY 
                D14_PRODUT,
				D14_QTDEST,
				D14_ENDER,
                D14_LOCAL, 
                D14_FILIAL
            ORDER BY 
                D14_PRODUT;
            `;

            const query_quantity = `
            SELECT 
                D14_PRODUT, D14_LOCAL, D14_FILIAL,
                SUM(D14_QTDEST) AS total_quantity
            FROM 
                [dbo].[D14010]
            ${where_clause}
            GROUP BY 
                D14_PRODUT, 
                D14_LOCAL, 
                D14_FILIAL
            ORDER BY 
                D14_PRODUT;
            `
            let request = pool.request()
            .input("branch_code", branch_code)
            .input("storage_code", storage_code)


            // Verificar se há dados retornados
            if (address_code) request.input("address_code", address_code)

            // Iterar pelos resultados e inserir no Prisma
            const result_geral = await request.query(query_geral)
            const result_quantity = await request.query(query_quantity)

            const imported_data = result_geral.recordset
            const imported_data_quantity = result_quantity.recordset

            for (const record of imported_data) {
                const { D14_QTDEST, D14_PRODUT, D14_LOCAL, D14_ENDER, D14_FILIAL, reserve_quantity, transf_quantity } = record;

                const product = await prismaClient.product.findFirst({
                    where: {
                        code: D14_PRODUT.trim(),
                    },
                });

                if (!product) {
                    throw new Error(`Produto ${D14_PRODUT} não encontrado.`);
                }

                //inserir no banco usando Prisma
                await prismaClient.addressed_stock.create({
                    data: {
                        addressed_quantity: D14_QTDEST,
                        branch_code: D14_FILIAL.trim(),
                        product_code: product.code,
                        storage_code: D14_LOCAL.trim(),
                        product_desc: product.description,
                        address_code: D14_ENDER.trim(),
                        transfer_quantity: transf_quantity,
                        reserve_quantity: reserve_quantity,
                        access_nivel: 0,

                    },
                });

                const address = prismaClient.invent_address.findFirst({
                    where: {
                        branch_code: D14_FILIAL.trim(),
                        storage_code: D14_LOCAL.trim(),
                        address_code: D14_ENDER.trim(),
                        document: document,
                        date_count: date_count
                    }
                })
                if (!address) {
                    await prismaClient.invent_address.create({
                        data: {
                            branch_code: D14_FILIAL.trim(),
                            storage_code: D14_LOCAL.trim(),
                            address_code: D14_ENDER.trim(),
                            document: document,
                            date_count: date_count,
                            status: 'NOVO',
                            access_nivel: 0,
                            situation: '' // Add the appropriate value for 'situation'
                        }
                    })
                }

                await prismaClient.invent_product.create({
                    data: {
                        branch_code: D14_FILIAL.trim(),
                        storage_code: D14_LOCAL.trim(),
                        product_code: D14_PRODUT.trim(),
                        product_desc: product.description, // Add the product description
                        document: document,
                        date_count: date_count,
                        status: 'NOVO',
                        counted: false,
                        situation: '', // Add the appropriate value for 'situation'
                        access_nivel: 0,
                    }
                })

            }
            for (const record of imported_data_quantity) {
                const { D14_PRODUT, D14_LOCAL, D14_FILIAL, total_quantity } = record
                const stock = await prismaClient.stock.findFirst({
                    where: {
                        product_code: D14_PRODUT.trim(),
                        storage_code: D14_LOCAL.trim(),
                        branch_code: D14_FILIAL.trim(),
                    }
                })
                const invent_product = await prismaClient.invent_product.findFirst({
                    where: {
                        product_code: D14_PRODUT.trim(),
                        storage_code: D14_LOCAL.trim(),
                        branch_code: D14_FILIAL.trim(),
                        document: document,
                    }
                })
                if (stock) {
                    let unbalanced
                    if (stock.total_quantity !== total_quantity) {
                        await prismaClient.stock.update({
                            where: {
                                id: stock.id
                            },
                            data: {
                                unbalanced: true
                            }
                        })
                    }
                    await prismaClient.stock.update({
                        where: {
                            id: stock.id
                        },
                        data: {
                            addresed_quantity: total_quantity,
                            unbalanced: unbalanced
                        }
                    })
                }
                if (invent_product){
                    await prismaClient.invent_product.update({
                        where: {
                            id: invent_product.id
                        },
                        data: {
                            original_quantity: total_quantity
                        }
                    })
                }
            }

            console.log("Dados importados com sucesso.")
            return { imported_data_geral: imported_data, imported_data_quantity: imported_data_quantity };
        } catch (error) {
            console.error("Erro ao importar dados do SQL Server:", error)
            throw new Error("Failed to import data from SQL Server.")
        }
    }
}