import prismaClient from "../../prisma/index.js";

export class ListService{
    async execute(){
        const services = await prismaClient.service.findMany({
            select:{
                id: true,
                code: true,
                name: true,
                created_at: true,
                updated_at: true
            }
        })
        return services
    }
}