import prismaClient from "../../prisma";

interface AddressRequest {
    branch_code: string;
    storage_code: string;
    address_code: string;
    user_last_count: string;
}

export class CloseInventAddressService {
    async execute({ branch_code, storage_code, address_code, user_last_count }: AddressRequest) {
        const invent_address = await prismaClient.invent_address.findFirst({
            where: {
                address_code: address_code,
                status: 'EM ANDAMENTO',
                branch_code: branch_code,
                storage_code: storage_code,
                user_last_count: user_last_count,
            },
        })

        if (invent_address) {
            const invet_address_up = await prismaClient.invent_address.update({
                where: {
                    id: invent_address.id,
                },
                data: {
                    status: "CONTATO",
                    user_last_count: invent_address.user_last_count
                }
            })


            return invet_address_up;
        } else {
            throw new Error("Inventário não encontrado ou não está em andamento.");
        }
    }

}