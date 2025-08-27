import prismaClient from "../../prisma";

interface VirtualLocationRequest {
    id: string;
}

export class DeleteVirtualLocationService {
    async execute({ id }: VirtualLocationRequest) {
        const virtualLocation = await prismaClient.virtualLocation.delete({
            where: {
                id: id,
            },
        });

        return virtualLocation;
    }
}