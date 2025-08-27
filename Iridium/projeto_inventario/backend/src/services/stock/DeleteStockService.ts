import prismaClient from "../../prisma";

export class DeleteStockService {
    async execute() {
        // Deleta todos os registros da tabela 'stock'
        const deletedStock = await prismaClient.stock.deleteMany({});

        console.log("Delete Stock efetuado.");

        return {deletedStock};
    }
}