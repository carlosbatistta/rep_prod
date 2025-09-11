import prismaClient from '../../prisma/index.js'

interface ServiceRequest {
    id: string;
}

export class DeleteService {
    async execute({ id }: ServiceRequest) {
        const service = await prismaClient.service.delete({
            where: {
                id: id,
            },
        });
    }
}