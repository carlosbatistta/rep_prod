import { connectToSqlServer } from "../../database/sqlServer";
import prismaClient from "../../prisma";

interface BranchRequest{
    branch_code?: string
    address?: boolean
}

export class ImportBranchService {
    async execute({branch_code, address}: BranchRequest): Promise<any>{
        let branches
        try{
            if( address === undefined && branch_code === undefined ){
                const pool = await connectToSqlServer();

                // Query para buscar os dados da tabela no SQL Server
                const query = `
                SELECT M0_CODFIL, M0_FILIAL, SUBSTRING(M0_CODFIL,1,2) AS COMPANY FROM SYS_COMPANY
                WHERE D_E_L_E_T_ <> '*'
                `;
    
                const result = await pool.request().query(query);
    
                // Verificar se há dados retornados
                if (result.recordset.length === 0) {
                    throw new Error("Não há dados na tabela SYS_COMPANY.");
                }
    
                const imported = result.recordset;
    
                for(const record of imported){
                    const {M0_CODFIL, M0_FILIAL, COMPANY} = record

                    const is_branch = await prismaClient.branch.findFirst({
                        where:{
                            code: branch_code
                        }
                    })

                    if(!is_branch){
                        await prismaClient.branch.create({
                            data:{
                                code: M0_CODFIL,
                                name: M0_FILIAL,
                                company: COMPANY
                                
                            }
                        });
                    }

                }
            } else if( address !== undefined && branch_code !== undefined  ){
                const get_branch = await prismaClient.branch.findFirst({
                    where: {
                        code: branch_code
                    }
                })
        
                await prismaClient.branch.update({
                    where: {
                        id: get_branch.id, // Assuming 'code' is the unique identifier
                    },
                    data: {
                        address: address,
                    },
                });
            }
            
            branches = prismaClient.branch.findMany({})

            console.log("Dados importados com sucesso");
            return branches

        }catch(error){
            console.error("Erro ao importar dados do SQL Server:", error);
            throw new Error("Failed to import data from SQL Server.");
        }
    }
}