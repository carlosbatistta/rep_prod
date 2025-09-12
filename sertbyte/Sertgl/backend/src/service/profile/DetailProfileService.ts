import prismaClient from "../../prisma/index.js";

export class DetailProfileService{
    async execute(code: number){
        const profile = await prismaClient.profile.findUnique({
            where: {
                code: code
            }
        })
        return profile
    }
}