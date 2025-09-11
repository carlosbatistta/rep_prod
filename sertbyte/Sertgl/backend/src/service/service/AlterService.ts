import prismaClient from '../../prisma/index.js'

interface ServiceRequest {
    code: number;
    name: string;
}

export class AlterService {
    async execute({ code, name }: ServiceRequest) {
        const service = await prismaClient.service.update({
            where: { code },
            data: { name },
        });
        return service;
    }
}
