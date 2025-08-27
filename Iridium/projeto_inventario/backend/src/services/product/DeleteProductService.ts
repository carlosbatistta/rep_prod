import prismaClient from "../../prisma";

export class DeleteProductService {
    async execute() {
        
        const deleted_products = await prismaClient.product.deleteMany({})

        console.log("Dados apagados com sucesso.")

        return deleted_products
    }
}