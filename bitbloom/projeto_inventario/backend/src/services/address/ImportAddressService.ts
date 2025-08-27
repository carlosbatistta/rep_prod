import { connectToSqlServer } from "../../database/sqlServer";
import prismaClient from "../../prisma";

export class ImportAddressService {

    async execute({ branch_code, storage_code }): Promise<any> {
        let status = 0
        const branch = await prismaClient.branch.findFirst({
            where: {
                code: branch_code,
            },
        });

        if (branch.address) {
            try {

                // Conectar ao SQL Server
                const pool = await connectToSqlServer();

                // Query para buscar os dados da tabela no SQL Server
                const query = `
                SELECT 
				BE_FILIAL, 
				BE_LOCAL, 
				BE_LOCALIZ, 
				BE_DESCRIC, 
				BE_STATUS 
				FROM 
				[dbo].[SBE010]
                WHERE 
				SBE010.D_E_L_E_T_ <> '*'
				AND BE_FILIAL = @branch_code
				AND BE_LOCAL = @storage_code
                `;

                // Executar a query no SQL Server
                const result = await pool.request()
                .input("branch_code", branch_code).input("storage_code", storage_code) // Insere o valor de `branch_code`
                .query(query);

                // Verificar se há dados retornados
                if (result.recordset.length === 0) {
                    throw new Error("Não há dados.");
                }

                // Iterar pelos resultados e inserir no Prisma
                const importedData = result.recordset;
                for (const record of importedData) {
                    const { BE_FILIAL, BE_LOCALIZ, BE_DESCRIC, BE_STATUS, BE_LOCAL, NNR_DESCRI } = record;

                    try {
                        status = parseInt(BE_STATUS.trim())
                    } catch (e) {
                        console.log("Erro ao converter o código para inteiro")
                        console.log(e)
                    }

                    await prismaClient.address.create({
                        data: {
                            branch_code: BE_FILIAL.trim(),
                            storage_code: BE_LOCAL.trim(),
                            address: BE_LOCALIZ.trim(),
                            description: BE_DESCRIC.trim(),
                            status: status,
                        },
                    });

                }

                console.log("Dados importados com sucesso.");
                return importedData; // Retornar os dados importados, se necessário
            } catch (error) {
                console.error("Erro ao importar dados do SQL Server:", error);
                throw new Error("Failed to import data from SQL Server.");
            }
        } else {
            throw new Error("Filial não controla endereços.");
        }
        
    }

}