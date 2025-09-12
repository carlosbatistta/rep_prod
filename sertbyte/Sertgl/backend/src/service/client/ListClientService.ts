import prismaClient from "../../prisma/index.js";

export class ListClientService{
    async execute(){
        
        const clients = await prismaClient.client.findMany({
            select:{
                id: true,
                cnpj: true,
                name_fantasy: true,
                name_company: true,
                ie: true,
                status: true,
                city: true,
                cod_city: true,
                cep: true,
                street: true,
                district: true,
                number: true,
                email: true
            }
        })
        return clients
    }
}