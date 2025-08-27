import prismaClient from "../../prisma";

interface ListInventRequest {
    storage_code?: String;
    branch_code?: String;
}

export class ListInventService {
    async execute(filters: ListInventRequest = {}) {
        const { storage_code, branch_code } = filters;

        const whereClause: any = {}

        if (storage_code !== undefined) {
            whereClause.storage_code = storage_code
        }

        if (branch_code !== undefined) {
            whereClause.branch_code = branch_code
        }

        const invents = await prismaClient.info_invent.findMany({
            where: whereClause,
        });

        console.log("Filtros aplicados:", JSON.stringify(whereClause, null, 2));

        return invents
    }
}