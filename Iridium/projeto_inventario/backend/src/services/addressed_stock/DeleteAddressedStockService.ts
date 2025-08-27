import prismaClient from "../../prisma";

export class DeleteAddressedStockService {
    async execute() {
        // Deleta todos os registros da tabela 'addressed_stock'
        const deletedAddressedStock = await prismaClient.addressed_stock.deleteMany({});

        console.log("Dados apagados com sucesso.");

        return { deletedAddressedStock };
    }
}