import prismaClient from "../../prisma/index.js"

export class DetailService{
    async execute(code: number){
        const service = await prismaClient.service.findUnique({
            where: {
                code: code
            }
        })
        return service
    }
}