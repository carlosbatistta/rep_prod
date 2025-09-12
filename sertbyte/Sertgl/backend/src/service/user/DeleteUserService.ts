import prismaClient from '../../prisma/index.js'

interface ClientRequest { 
    id: string;
}

export class DeleteUserService {
    async execute({ id }: ClientRequest) {
        const user = await prismaClient.user.delete({
            where: { 
                id: id 
            }
        });
        return user;
    }
}