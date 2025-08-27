import { connectToSqlServer } from "../../database/sqlServer";
import prismaClient from "../../prisma";

export class ImportStorageService {
    async execute(): Promise<any> {
        try {
            const pool = await connectToSqlServer();

            // Query para buscar os dados da tabela no SQL Server
            const query = `
            SELECT NNR_CODIGO, NNR_DESCRI FROM NNR010
            WHERE NNR010.D_E_L_E_T_ <> '*'
            `;

            const result = await pool.request().query(query);

            // Verificar se há dados retornados
            if (result.recordset.length === 0) {
                throw new Error("Não há dados na tabela NNR010.");
            }

            const imported = result.recordset;

            for(const record of imported){
                const {NNR_CODIGO, NNR_DESCRI} = record

                await prismaClient.storage.create({
                    data:{
                        code: NNR_CODIGO,
                        name: NNR_DESCRI
                    }
                });
            }
        
            console.log("Dados importados com sucesso");
            return imported

        } catch(error){
            console.error("Erro ao importar dados do SQL Server:", error);
            throw new Error("Failed to import data from SQL Server.");
        }
    }
}