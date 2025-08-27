import prismaClient from "../../prisma";

interface AccessRequest {
    id: string;
}

export class DeleteAccessService {
    async execute({ id }: AccessRequest) {
        const access = await prismaClient.access.delete({
            where: {
                id: id,
            },
        });

        return access;
    }
}