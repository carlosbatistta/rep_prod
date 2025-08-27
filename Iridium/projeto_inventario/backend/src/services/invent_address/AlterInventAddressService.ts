import prismaClient from "../../prisma";

interface InventAddressRequest {
    document: number;
    address_code: string;
    branch_code: string;
    storage_code: string;
    status?: string;
    situation?: string;
    user_last_count?: string;
    difference_quantity?: number;
    original_quantity?: number;
    count_quantity?: number;
    value_difference?: number;
}

export class AlterInventAddressService {
    async execute(requestData: InventAddressRequest) {
        const { document, address_code, branch_code, storage_code, ...updateFields } = requestData;

        // Verifica se pelo menos um campo foi passado para atualização
        if (Object.keys(updateFields).length === 0) {
            throw new Error("Pelo menos um campo de atualização deve ser fornecido.");
        }

        // Busca o registro para garantir que ele existe
        const invent_address_e = await prismaClient.invent_address.findFirst({
            where: {
                address_code,
                branch_code,
                storage_code,
                document,
            },
        });

        if (!invent_address_e) {
            throw new Error("Endereço não encontrado.");
        }

        // Atualiza somente os campos enviados no JSON
        const invent_address = await prismaClient.invent_address.update({
            where: {
                id: invent_address_e.id,
            },
            data: updateFields, // Apenas os campos fornecidos serão alterados
        });

        return invent_address;
    }
}
