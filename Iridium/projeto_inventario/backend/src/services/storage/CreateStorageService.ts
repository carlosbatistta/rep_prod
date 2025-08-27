import prismaClient from "../../prisma";

interface StorageRequest {
    code: string;
    name: string;
}

export class CreateStorageService {
    async execute({ code, name }: StorageRequest) {
        if (!name || !code) {
            throw new Error("Código e nome são obrigatórios");
        }

        const storage = await prismaClient.storage.create({
            data: {
                code,
                name,
            },
            select: {
                id: true,
                code: true,
                name: true,
            },
        });

        return storage;
    }
}