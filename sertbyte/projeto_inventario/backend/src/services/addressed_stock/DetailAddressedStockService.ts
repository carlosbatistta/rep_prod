import prismaClient from "../../prisma";

interface AddressedStockRequest {
    address_code: string,
}

export class DetailAddressedStockService {
    async execute({ address_code }: AddressedStockRequest) {
        const addressed_stock = await prismaClient.addressed_stock.findFirst({
            where: {
                address_code: address_code,
            }
        })
        console.log(addressed_stock)
        return addressed_stock
    }
}