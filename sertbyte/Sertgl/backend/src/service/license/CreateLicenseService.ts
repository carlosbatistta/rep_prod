import prismaClient from '../../prisma/index.js'
import { hash } from 'bcryptjs'
import type { LicenseStatus, LicenseType } from '@prisma/client';

interface LicenseRequest {
    status: LicenseStatus;
    type: LicenseType;
    db_connection?: string;
    db_user?: string;
    db_password?: string;
    valid_until: Date
    client_id: string;
    service_id: string; 
}

export class CreateLicenseService {
    async execute({ status, type, db_connection, db_user, db_password, valid_until, client_id, service_id }: LicenseRequest) {
        if (!client_id && !service_id) {
            throw new Error("Client ID and Service ID are required");
        }
        const existingClient = await prismaClient.client.findUnique({
            where: { id: client_id },
        });

        const existingService = await prismaClient.service.findUnique({
            where: { id: service_id },
        });

        if (!existingClient || !existingService) {
            throw new Error("Client or Service not found");
        }

        const db_connection_hash = await hash(db_connection, 8);
        const db_user_hash = await hash(db_user, 8);
        const db_password_hash = await hash(db_password, 8);

        const license = await prismaClient.license.create({
            data: {
                status,
                type,
                db_connection: db_connection_hash,
                db_user: db_user_hash,
                db_password: db_password_hash,
                valid_until,
                client: { connect: { id: client_id } },
                service: { connect: { id: service_id } }
            }
        });

        return license;
    }
}