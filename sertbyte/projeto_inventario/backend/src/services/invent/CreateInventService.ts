import prismaClient from "../../prisma";

interface InventRequest {
    date_count: string;
    date_valid: string;
    branch_code: string;
    storage_code: string;
    invent_type: string;
    offline: boolean;
}

export class CreateInventService {
    async execute({ date_count, date_valid, branch_code, storage_code, invent_type, offline }: InventRequest) {

        const is_document = await prismaClient.number_control.findFirst({
            where: {
                branch_code: branch_code,
                storage_code: storage_code,
                service: 'document'
            }
        })

        const is_invent = await prismaClient.info_invent.findFirst({
            where: {
                branch_code: branch_code,
                storage_code: storage_code,
                status: { in: ["ABERTO", "EM ANDAMENTO"] }
            }
        });
        

        if (is_invent) {
            throw new Error(`Inventário já cadastrado: ${is_invent.document} está Ativo.`);
        }

        const newInvent = await prismaClient.info_invent.create({
            data: {
                tp_material: 'ME',
                document: is_document.number,
                date_count,
                date_valid,
                origin: 'SIA',
                branch_code,
                storage_code,
                access_nivel: 0,
                status: 'ABERTO',
                invent_type,
                offline
            },
            select: {
                tp_material: true,
                document: true,
                date_count: true,
                date_valid: true,
                origin: true,
                branch_code: true,
                storage_code: true,
                invent_type: true,
                offline: true
            },
        });

        console.log(newInvent)

        const info_stock = await prismaClient.info_stock.create({
            data: {
                branch_code: branch_code,
                storage_code: storage_code,
                date_count: date_count,
                document: is_document.number,
                access_nivel: 0,
            }
        })

        await prismaClient.number_control.update({
            where: {
                id: is_document.id
            },
            data: {
                number: is_document.number + 1
            }
        })

        console.log(info_stock)

        return { newInvent, info_stock };
    }
}