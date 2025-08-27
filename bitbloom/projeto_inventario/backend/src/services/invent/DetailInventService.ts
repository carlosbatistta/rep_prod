import prismaClient from "../../prisma";

interface InventRequest {
    document: number;
    date_count: string;
    branch_code: string;
}

export class DetailInventService {
    async execute({ document, date_count, branch_code }: InventRequest) {
        const invent = await prismaClient.info_invent.findFirst({
            where: {
                document: document,
                date_count: date_count,
                branch_code: branch_code
            }
        })
        console.log(invent)
        return invent;
    }
}