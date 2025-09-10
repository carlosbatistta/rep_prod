import prismaClient from '../../prisma/index.js'

interface ProfileRequest {
    id: string;
}

export class DeleteProfileService {
    async execute({ id }: ProfileRequest) {
        const profile = await prismaClient.profile.delete({
            where: {
                id: id,
            },
        });

        return profile;
    }
}