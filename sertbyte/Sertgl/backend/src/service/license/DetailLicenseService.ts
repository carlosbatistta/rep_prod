import prismaClient from "../../prisma/index.js";

export class DetailLicenseService{
    async execute(code: number){
        const license = await prismaClient.license.findUnique({
            where: {
                code: code
            }
        })
        return license
    }
}