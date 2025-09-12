import prismaClient from '../../prisma/index.js'

interface ProfileRequest {
    name: string;
    level: number;

}

export class CreateProfileService {
    async execute({ name, level }: ProfileRequest) {
        if (!name) {
            throw new Error("Name is required");
        }

        const profile = await prismaClient.profile.create({
            data: {
                name,
                level,
            },
            select: {
                id: true,
                name: true,
                level: true,
            },
        });

        return profile;
    }
}