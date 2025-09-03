import { connectToSqlServer } from "../../database/sqlServer";
import prismaClient from "../../prisma";


export class ImportProductService {
    async execute(): Promise<any> {
        try {

            const pool = await connectToSqlServer();

            const query_geral = `
                SELECT DISTINCT 
                B1_DESC, 
                B1_COD, 
                B1_CODBAR, 
                B1_TIPO, 
                B1_ESPECIF, 
                B1_V18, 
                B1_V19, 
                B1_V30,
                B1_V33, 
                B1_V34 
                FROM [dbo].[SB1010]
                WHERE SB1010.D_E_L_E_T_ <> '*'
            `

            const result_geral = await pool.request().query(query_geral);

            // Verificar se há dados retornados
            if (result_geral.recordset.length === 0) {
                throw new Error("Não há dados na tabela SB1010.");
            }

            // Iterar pelos resultados e inserir no Prisma
            const imported_data_geral = result_geral.recordset;

            for (const record of imported_data_geral) {
                const { B1_DESC, B1_COD, B1_CODBAR, B1_ESPECIF, B1_V18, B1_V19, B1_V30, B1_V33, B1_V34 } = record;

                // Inserir no banco usando Prisma
                await prismaClient.product.create({
                    data: {
                        name: B1_DESC.trim(),
                        code: B1_COD.trim(),
                        codBar: B1_CODBAR.trim(),
                        description: B1_ESPECIF.trim(),
                        access_nivel: 0,
                        departament: B1_V18.trim(),
                        line: B1_V19.trim(),
                        group: B1_V30.trim(),
                        subgroup: B1_V33.trim(),
                        feature: B1_V34.trim()
                    },
                });
            }

            console.log("Dados importados com sucesso.")
            return imported_data_geral
        } catch (error) {
            console.error("Erro ao importar dados do SQL Server:", error)
            throw new Error("Failed to import data from SQL Server.")
        }
    }
}
