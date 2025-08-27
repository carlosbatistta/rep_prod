import prismaClient from "../../prisma";

export class ListBranchService{
    async execute(){

        const branches = await prismaClient.branch.findMany({})

        return branches
    }
}