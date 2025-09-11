import prismaClient from '../../prisma/index.js'

interface ServiceRequest {
    code: number;
    name: string;
}

export class CreateService {
    async execute({ code, name }: ServiceRequest) {
        const service = await prismaClient.service.create({
            data: {
                code,
                name,
            },
        });
        return service;
    }
}