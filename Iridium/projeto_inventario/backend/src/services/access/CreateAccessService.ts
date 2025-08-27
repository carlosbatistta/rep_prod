import prismaClient from "../../prisma";

interface AccessRequest {
    permission: string;
    access_nivel: string;
    profile_id: string;
}

export class CreateAccessService {
    async execute({ permission, profile_id, access_nivel }: AccessRequest) {
        if (!permission && !access_nivel) {
            throw new Error("Access is required");
        }

        const accessAlreadyExists = await prismaClient.profile.findFirst({
            where: { id: profile_id },
        });

        if (!accessAlreadyExists) {
            throw new Error("Access already exists");
        }

        const newAccess = await prismaClient.access.create({
            data: {
                permission,
                profile_id: profile_id,
                access_nivel,
            },
            select: {
                id: true,
                permission: true,
                access_nivel: true,
            },
        });

        return newAccess;
    }
}