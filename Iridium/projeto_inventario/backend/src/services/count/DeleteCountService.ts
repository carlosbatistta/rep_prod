import prismaClient from "../../prisma";

interface CountRequest {
    id: string;
}

export class DeleteCountService {
    async execute({ id }: CountRequest) {
        const count = await prismaClient.count.delete({
            where: {
                id: id,
            },
        });

        return count;
    }
}