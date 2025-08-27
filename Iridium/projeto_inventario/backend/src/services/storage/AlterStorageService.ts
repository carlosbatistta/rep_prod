import prismaClient from "../../prisma";

interface StorageRequest {
    id: string;
    code: string;
    name: string;
}

export class AlterStorageService {
    async execute({ id, code, name }: StorageRequest) {
        if (!name && !code) {
            throw new Error("Name and code is required");
        }

        const storage = await prismaClient.storage.update({
            where: {
                id: id,
            },
            data: {
                code,
                name,
            },
            select: {
                code: true,
                name: true,
            },
        });

        return storage;
    }
}