import prismaClient from "../../prisma/index.js";

export class ListLicenseService{
    async execute(){
        const licenses = await prismaClient.license.findMany({
            select:{
                id: true,
                code: true,
                status: true,
                type: true,
                client_id: true,
                created_at: true,
                updated_at: true
            }
        })
        return licenses
    }
}