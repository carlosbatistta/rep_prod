import prismaClient from '../../prisma/index.js'

interface ProfileRequest {
    id: string;
}

export class DeleteClientService {
    async execute({ id }: ProfileRequest) {
        const client = await prismaClient.client.delete({
            where: {
                id: id,
            },
        });

        return client;
    }
}