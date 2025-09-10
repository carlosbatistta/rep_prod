import prismaClient from "../../prisma/index.js";

interface ClientRequest {
    id: string;
    cnpj: string;
    name_fantasy: string;
    name_company: string;
    ie: string;
    status: string;
    city: string;
    cod_city: string;
    cep: string;
    street: string;
    district: string;
    number: string;
    email: string;
}

export class CreateClientService {
    async execute({ id, cnpj, name_fantasy, name_company, ie, status, city, cod_city, cep, street, district, number, email }: ClientRequest) {
        if (!cnpj && !name_fantasy && !name_company && !ie && !status && !city && !cod_city && !cep && !street && !district && !number && !email) { 
            throw new Error("Pelo menos um campo deve ser preenchido");
        }

        const client = await prismaClient.client.create({
            data:{
                cnpj,
                name_fantasy,
                name_company,
                ie: ie ? Number(ie) : undefined,
                status: status as any, // Cast to 'any' or 'ClientStatus' if imported
                city,
                cod_city: cod_city ? Number(cod_city) : undefined,
                cep: cep ? Number(cep) : undefined,
                street,
                district,
                number,
                email
            },
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

        return client;
    }
}