import prismaClient from "../../prisma";

interface BranchRequest {
    branch_code: string;
    address: boolean;
}

export class AlterBranchService {
    async execute({ branch_code, address }: BranchRequest) {

        const get_branch = await prismaClient.branch.findFirst({
            where: {
                code: branch_code
            }
        })

        const branch = await prismaClient.branch.update({
            where: {
                id: get_branch.id, // Assuming 'code' is the unique identifier
            },
            data: {
                address: address,
            },
            select: {
                name: true,
                code: true,
                status: true,
                address: true,
            },
        });

        return branch;
    }
}