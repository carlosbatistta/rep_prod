import prismaClient from "../../prisma/index.js";

export class ListProfileService{
    async execute(){
        
        const profiles = await prismaClient.profile.findMany({
            select:{
                id: true,
                code: true,
                name: true,
                level: true
            }
        })
        return profiles
    }
}