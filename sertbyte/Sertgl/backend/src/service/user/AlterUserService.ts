import prismaClient from '../../prisma/index.js'

interface ClientRequest { 
    id: string;
    name: string;
    email: string;
    password: string;
}

export class AlterUserService {
    async execute({ id, name, email, password }: ClientRequest) {
        const user = await prismaClient.user.update({
            where: { 
                id: id 
            },
            data: { 
                name,
                email,
                password
            }
        });
        return user;
    }
}