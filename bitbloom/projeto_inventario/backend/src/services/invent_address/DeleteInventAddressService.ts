import prismaClient from "../../prisma";

interface InventAddress {
    branch_code: string;
    storage_code: string;
    date_count: string;
    document: number;
}

export class DeleteInventAddressService {
    async execute({ branch_code, storage_code, date_count, document }: InventAddress) {
        // Deleta todos os registros que correspondem aos filtros fornecidos
        const deletedStock = await prismaClient.invent_address.deleteMany({
            where: {
                branch_code: branch_code,
                storage_code: storage_code,
                date_count: date_count,
                document: document
            }
        });

        console.log(`Delete Stock efetuado. Registros deletados: ${deletedStock.count}`);

        return { deletedStock };
    }
}