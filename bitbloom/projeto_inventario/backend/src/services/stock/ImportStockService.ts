import { connectToSqlServer } from "../../database/sqlServer";
import prismaClient from "../../prisma";
import { ValidadeService } from "../util/ValidateService";

interface StockRequest {
    branch_code: string
    storage_code: string
    date_count: string
    document: number
    departament?: string
    line?: string
    group?: string
    subgroup?: string
    feature?: string
}

export class ImportStockService {
    async execute({ branch_code, document, storage_code, date_count, departament, line, group, subgroup, feature }: StockRequest): Promise<any> {

        await ValidadeService.validateStockDocument(branch_code, storage_code, date_count, document)

        try {

            const pool = await connectToSqlServer();

            let filters: string[] = [];
            

            if (departament) filters.push("AND B1_V18 = @departament")
            if (line) filters.push("AND B1_V19 = @line")
            if (group) filters.push("AND B1_V30 = @group")
            if (subgroup) filters.push("AND B1_V33 = @subgroup")
            if (feature) filters.push("AND B1_V34 = @feature")

            const where_clause = `
                WHERE 
                    SB2010.D_E_L_E_T_ <> '*'
                    AND SB1010.D_E_L_E_T_ <> '*'
                    AND B2_FILIAL = @branch_code
                    AND B2_COD != ''
                    AND B2_LOCAL = @storage_code
                    ${filters.join(" ")}
            `

            const query_geral = `
                SELECT 
                    B2_COD,
                    B1_ESPECIF,
                    B2_LOCAL, 
                    B2_FILIAL,
                    B2_QATU,
                    B2_CM1, 
                    B2_RESERVA
                FROM 
                    [dbo].[SB2010]
                INNER JOIN SB1010 ON B1_COD = B2_COD
                ${where_clause}
            `

            const query_total = `
                SELECT 
                    B2_LOCAL, 
                    B2_FILIAL,
                    SUM(B2_QATU) AS total_stock_quantity,
                    ROUND(SUM(B2_QATU * B2_CM1), 4) AS total_stock_value
                FROM 
                    [dbo].[SB2010]
                INNER JOIN SB1010 ON B1_COD = B2_COD
                ${where_clause}
                GROUP BY B2_LOCAL, B2_FILIAL
            `

            const query_indicadores = `
                SELECT 
                    BZ_COD, BZ_LOCPAD, BZ_CTRWMS, BZ_LOCALIZ, BZ_FILIAL
                FROM [dbo].[SBZ010]
                INNER JOIN SB1010 ON B1_COD = BZ_COD
                WHERE 
                    SBZ010.D_E_L_E_T_ <> '*'
                    AND BZ_FILIAL = @branch_code
                    AND BZ_LOCPAD = @storage_code
            `;

            const query_order = `
                SELECT  
                    COUNT(C9_PEDIDO) AS PEDIDOS
                FROM [dbo].[SC9010]
                WHERE 
                    SC9010.D_E_L_E_T_ <> '*'
                    AND C9_FILIAL = @branch_code
                    AND C9_LOCAL = @storage_code
					AND C9_NFISCAL = ''
            `

            let request = pool.request()
                .input("branch_code", branch_code)
                .input("storage_code", storage_code)

            if (departament) request.input("departament", departament)
            if (line) request.input("line", line)
            if (group) request.input("group", group)
            if (subgroup) request.input("subgroup", subgroup)
            if (feature) request.input("feature", feature)

            const result_geral = await request.query(query_geral)
            const result_total = await request.query(query_total)
            const result_indicadores = await request.query(query_indicadores)
            const result_order = await request.query(query_order)

            if (result_geral.recordset.length === 0) {
                throw new Error("Não há dados na B2.")
            }

            if (result_indicadores.recordset.length === 0) {
                throw new Error("Não há dados na BZ.")
            }

            const imported_data = result_geral.recordset
            const imported_data_indicadores = result_indicadores.recordset
            const imported_data_total = result_total.recordset
            const imported_data_order = result_order.recordset

            for (const record of imported_data) {
                const { B2_QATU, B2_COD, B2_LOCAL, B2_FILIAL, B2_CM1, B2_RESERVA } = record

                const product = await prismaClient.product.findFirst({
                    where: { code: B2_COD.trim() },
                });

                if (!product) {
                    throw new Error(`Produto ${B2_COD.trim()} não encontrado.`);
                }

                await prismaClient.stock.create({
                    data: {
                        total_quantity: B2_QATU,
                        branch_code: B2_FILIAL.trim(),
                        product_code: product.code,
                        storage_code: B2_LOCAL.trim(),
                        product_desc: product.description,
                        cost: B2_CM1 ?? 0,
                        reservation: B2_RESERVA,
                        address_control: "2",
                        localiz_control: "N",
                        addresed_quantity: 0,
                        unbalanced: false,
                        access_nivel: 0
                    },
                });

                const branch = await prismaClient.branch.findFirst({
                    where: { code: branch_code },
                });

                if (branch && !branch.address) {
                    await prismaClient.invent_product.create({
                        data: {
                            branch_code: B2_FILIAL.trim(),
                            product_code: product.code,
                            storage_code: B2_LOCAL.trim(),
                            product_desc: product.description,
                            document: document,
                            date_count: date_count,
                            counted: false,
                            access_nivel: 0,
                            status: "NOVO",
                            situation: "",
                            original_quantity: B2_QATU
                        }
                    });
                }
            }

            for (const record of imported_data_indicadores) {
                const { BZ_COD, BZ_CTRWMS, BZ_LOCALIZ, BZ_LOCPAD, BZ_FILIAL } = record;

                const stock = await prismaClient.stock.findFirst({
                    where: {
                        product_code: BZ_COD.toString().trim(),
                        branch_code: BZ_FILIAL.toString().trim(),
                        storage_code: BZ_LOCPAD.toString().trim(),
                    },
                });

                if (stock) {
                    await prismaClient.stock.update({
                        where: { id: stock.id },
                        data: {
                            address_control: BZ_CTRWMS.trim(),
                            localiz_control: BZ_LOCALIZ.trim()
                        }
                    });
                }
            }

            for (const record of imported_data_total) {
                const { B2_LOCAL, B2_FILIAL, total_stock_quantity, total_stock_value } = record;

                const info_stock = await prismaClient.info_stock.findFirst({
                    where: {
                        branch_code: B2_FILIAL.trim(),
                        storage_code: B2_LOCAL.trim(),
                        document: document
                    },
                });

                if (info_stock) {
                    await prismaClient.info_stock.update({
                        where: { id: info_stock.id },
                        data: {
                            total_stock_quantity: total_stock_quantity,
                            total_stock_value: total_stock_value
                        }
                    });
                    console.log("Info_stock atualizado");
                }
            }

            if (imported_data_order[0].PEDIDOS > 0) {
                const invent = await prismaClient.info_invent.findFirst({
                    where: {
                        branch_code: branch_code,
                        storage_code: storage_code,
                        document: document
                    },
                })

                await prismaClient.info_invent.update({
                    where:{id: invent.id},
                    data: {
                        order_quantity: imported_data_order[0].PEDIDOS
                    }
                })
            }

            console.log("Import Stock (B2, BZ) e invent_stock Efetuado.");
            return imported_data;
        } catch (error) {

        }


    }
}
