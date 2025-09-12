import prismaClient from '../../prisma/index.js'

interface LicenseRequest {
    id: string;
}

export class DeleteLicenseService {
    async execute({ id }: LicenseRequest) {
        const license = await prismaClient.license.delete({
            where: {
                id: id,
            },
        });
        return license;
    }
}    