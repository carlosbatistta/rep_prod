import prismaClient from '../../prisma/index.js'
import { ClientStatus } from '@prisma/client'

interface ClientRequest {
    id: string
    cnpj: string
    name_fantasy: string
    name_company: string
    ie: number
    status: ClientStatus
    city: string
    cod_city: number
    cep: number
    street: string
    district: string
    number: string
    email: string
}

export class AlterProfileController{
    async execute({ id, cnpj, name_fantasy, name_company, ie, status, city, cod_city, cep, street, district, number, email }: ClientRequest) {
        if (!id) {
            throw new Error("ID do cliente é obrigatório");
        }

        const client = await prismaClient.client.findUnique({
            where: { id }
        })

        if (!client) {
            throw new Error("Cliente não encontrado");
        }

        const updatedClient = await prismaClient.client.update({
            where: { id },
            data: {
                cnpj,
                name_fantasy,
                name_company,
                ie,
                status,
                city,
                cod_city,
                cep,
                street,
                district,
                number,
                email
            }
        })

        return updatedClient
    }
