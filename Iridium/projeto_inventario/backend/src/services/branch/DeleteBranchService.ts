import prismaClient from "../../prisma";

export class DeleteBranchService {
    async execute() {
        const branch = await prismaClient.branch.deleteMany({})

        return branch;
    }
}