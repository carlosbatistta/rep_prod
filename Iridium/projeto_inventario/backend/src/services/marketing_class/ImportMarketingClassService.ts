import { request } from "express";
import { connectToSqlServer } from "../../database/sqlServer";
import prismaClient from "../../prisma";

export class ImportMarketingClassService {
    async execute(): Promise<any> {
        try {

            const pool = await connectToSqlServer();

            const query_departament = `
            SELECT 
                V18_CODIGO, 
                V18_DESCRI 
            FROM 
                V18010
            WHERE 
                V18010.D_E_L_E_T_ <> '*'
            `
            const query_line = `
            SELECT 
                V19_CODIGO, 
                V19_DESCRI 
            FROM 
                V19010
            WHERE 
                V19010.D_E_L_E_T_ <> '*'
            `
            const query_group = `
            SELECT 
                V30_CODIGO, 
                V30_DESCRI 
            FROM 
                V30010
            WHERE 
                V30010.D_E_L_E_T_ <> '*'
            `
            const query_subgroup = `
            SELECT 
                V33_CODIGO, 
                V33_DESCRI 
            FROM 
                V33010
            WHERE 
                V33010.D_E_L_E_T_ <> '*'
            `
            const query_feature = `
            SELECT 
                V34_CODIGO, 
                V34_DESCRI 
            FROM 
                V34010
            WHERE 
                V34010.D_E_L_E_T_ <> '*'
            `
            let request = pool.request()

            const result_departament = await request.query(query_departament)
            const result_line = await request.query(query_line)
            const result_group = await request.query(query_group)
            const result_subgroup = await request.query(query_subgroup)
            const result_feature = await request.query(query_feature)

            const imported_data_departament = result_departament.recordset
            const imported_data_line = result_line.recordset
            const imported_data_group = result_group.recordset
            const imported_data_subgroup = result_subgroup.recordset
            const imported_data_feature = result_feature.recordset

            for (const record of imported_data_departament) {
                const { V18_CODIGO, V18_DESCRI } = record
                await prismaClient.departament.create({
                    data: {
                        code: V18_CODIGO.trim(),
                        description: V18_DESCRI.trim()
                    }
                })
            }

            for (const record of imported_data_line) {
                const { V19_CODIGO, V19_DESCRI } = record
                await prismaClient.line.create({
                    data: {
                        code: V19_CODIGO.trim(),
                        description: V19_DESCRI.trim()
                    }
                })
            }

            for (const record of imported_data_group) {
                const { V30_CODIGO, V30_DESCRI } = record
                await prismaClient.group.create({
                    data: {
                        code: V30_CODIGO.trim(),
                        description: V30_DESCRI.trim()
                    }
                })
            }

            for (const record of imported_data_subgroup) {
                const { V33_CODIGO, V33_DESCRI } = record
                await prismaClient.subgroup.create({
                    data: {
                        code: V33_CODIGO.trim(),
                        description: V33_DESCRI.trim()
                    }
                })
            }

            for (const record of imported_data_feature) {
                const { V34_CODIGO, V34_DESCRI } = record
                await prismaClient.feature.create({
                    data: {
                        code: V34_CODIGO.trim(),
                        description: V34_DESCRI.trim()
                    }
                })
            }
            console.log("Importação realizada")
            return { imported_data_departament, imported_data_feature, imported_data_group, imported_data_subgroup, imported_data_line }
        } catch (error) {
            console.error("Erro ao importar dados do SQL Server:", error)
            throw new Error("Failed to import data from SQL Server.")
        }
    }
}