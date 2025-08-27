import prismaClient from "../../prisma";

export class DeleteStorageService {
    async execute() {
        const storage = await prismaClient.storage.deleteMany({})

        return storage;
    }
}