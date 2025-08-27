import prismaClient from "../../prisma";

interface AccessRequest {
    id: string;
    permission: string;
    access_nivel: string;
    profile_id: string;
}

export class AlterAccessService {
    async execute({ id, permission, access_nivel, profile_id }: AccessRequest) {
        if (!permission && !access_nivel) { 
            throw new Error("Permissão ou nível de acesso é obrigatório");
        }

        // Verificar se o profile_id existe
        if (profile_id) {
            const profileExists = await prismaClient.profile.findUnique({
                where: {
                    id: profile_id,
                },
            });

            if (!profileExists) {
                throw new Error("O profile_id informado não existe.");
            }
        }

        // Atualizar o acesso
        const access = await prismaClient.access.update({
            where: {
                id: id,
            },
            data: {
                permission,
                access_nivel,
                profile_id,
            },
            select: {
                permission: true,
                access_nivel: true,
                profile_id: true,
            },
        });

        return access;
    }
}
