import prismaClient from "../../prisma";

interface DetailRequest {
    code: string
}

export class DetailProductService {
    async execute({ code }: DetailRequest) {
        const product = await prismaClient.product.findFirst({
            where: {
                code: code
            }
        })

        console.log(product)

        return product;
    }
}