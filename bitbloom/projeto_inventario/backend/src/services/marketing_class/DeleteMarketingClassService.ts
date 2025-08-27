import prismaClient from "../../prisma";

export class DeleteMarketingClassService {
    async execute() {

        const delete_departament = await prismaClient.departament.deleteMany()
        const delete_line = await prismaClient.line.deleteMany()
        const delete_group = await prismaClient.group.deleteMany()
        const delete_subgroup = await prismaClient.subgroup.deleteMany()
        const delete_feature = await prismaClient.feature.deleteMany()

        return "dados apagados"

        console.log("Dados apagados com sucesso.")


    }
}