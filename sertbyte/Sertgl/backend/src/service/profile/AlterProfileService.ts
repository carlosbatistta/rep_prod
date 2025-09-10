import prismaClient from '../../prisma/index.js'

interface ProfileRequest {
    id: string;
    name: string;
    nivel: number;
}

export class AlterProfileService {
    async execute({ id, name, nivel }: ProfileRequest) {
        if (!name && !nivel) { 
            throw new Error("Nome ou nível de acesso é obrigatório");
        }

        // Atualizar o profile
        const profile = await prismaClient.profile.update({
            where: {
                id: id,
            },
            data: {
                name,
                nivel,
            },
            select: {
                name: true,
                nivel: true,
            },
        });

        return profile;
    }
}