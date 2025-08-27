import prismaClient from "../../prisma";

interface InventRequest {
    document: number,
    branch_code: string,
    storage_code: string,
    date_count: string,
}

export class DeleteInventService {
    async execute({ document, branch_code, storage_code, date_count }: InventRequest) {
        const invent = await prismaClient.info_invent.findFirst({
            where: {
                document: document,
                branch_code: branch_code,
                storage_code: storage_code,
                date_count: date_count,
            },
        });
        
        const info_stock = await prismaClient.info_stock.findFirst({
            where: {
                document: document,
                branch_code: branch_code,
                storage_code: storage_code,
                date_count: date_count,
            },
        })

        const delete_invent = await prismaClient.info_invent.delete({
            where:{
                id: invent.id
            }
        })

        const delete_stock = await prismaClient.info_stock.delete({
            where:{
                id: info_stock.id
            }
        })

        return { delete_invent, delete_stock };
    }
}