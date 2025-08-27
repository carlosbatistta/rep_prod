import prismaClient from '../../prisma'

interface ProfileRequest {
    name: string;
    nivel: number;

}

export class CreateProfileService {
    async execute({ name, nivel }: ProfileRequest) {
        if (!name) {
            throw new Error("Name is required");
        }

        const profile = await prismaClient.profile.create({
            data: {
                name,
                nivel,
            },
            select: {
                id: true,
                name: true,
                nivel: true,
            },
        });

        return profile;
    }
}