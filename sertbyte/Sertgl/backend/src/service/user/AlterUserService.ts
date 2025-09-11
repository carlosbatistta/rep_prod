import prismaClient from '../../prisma/index.js'

interface ClientRequest { 
    id: string;
    name: string;
    level: number;
}

class AlterUserService {
    async execute({ name, level }: ClientRequest) {
        const user = await prismaClient.user.update({
            where: { 
                id: id, 
            },
            data: { name, level }
        });
        return user;
    }
}