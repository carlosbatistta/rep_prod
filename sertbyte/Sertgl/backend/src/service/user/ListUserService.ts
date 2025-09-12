import prismaClient from "../../prisma/index.js";

export class ListUserService{
    async execute(){
        const users = await prismaClient.user.findMany({
            select:{
                id: true,
                code: true,
                email: true,
                name: true,
                created_at: true,
                updated_at: true
            }
        })
        return users
    }
}