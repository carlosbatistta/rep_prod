import prismaClient from "../../prisma";

interface AddressRequest {
    branch_code: string;
    storage_code: string;
    address_code: string;
    user_last_count: string;
}

export class OpenAddressService {
    async execute({ branch_code, storage_code, address_code, user_last_count }: AddressRequest) {
        const invent_address = await prismaClient.invent_address.findFirst({
            where: {
                address_code: address_code,
                status: 'NOVO',
                branch_code: branch_code,
                storage_code: storage_code,
            },
        })

        const invent_product = await prismaClient.invent_product.findFirst({
            where: {
                address_code: address_code,
                branch_code: branch_code,
                storage_code: storage_code,
            },
        })

        const invet_address_up = await prismaClient.invent_address.update({
            where: {
                id: invent_address.id,
            },
            data: {
                status: "EM ANDAMENTO",
                user_last_count: user_last_count
            }
        })

        const invent_product_up = await prismaClient.invent_product.update({
            where: {
                id: invent_product.id,
            },
            data: {
                status: "EM ANDAMENTO",
            }
        })

        return {invet_address_up, invent_product_up};
    }

}