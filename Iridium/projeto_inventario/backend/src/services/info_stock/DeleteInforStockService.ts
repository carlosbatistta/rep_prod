import prismaClient from "../../prisma";

interface InfoStockRequest {
    branch_code: string;
    storage_code: string;
    date_count: string;
    document: number;
}

export class DeleteInfoStockService {
    async execute({ branch_code, document, storage_code, date_count }: InfoStockRequest) {
        const deletedImfoStock = await prismaClient.info_stock.findFirst({
            where: {
                branch_code: branch_code,
                document: document,
                storage_code: storage_code,
                date_count: date_count
            }
        })
        await prismaClient.info_stock.delete({
            where: {
                id: deletedImfoStock.id
            }
        });
        console.log("Dados apagados com sucesso.");
        return { deletedImfoStock };
    }
}