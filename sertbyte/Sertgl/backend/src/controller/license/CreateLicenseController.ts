import type { Request, Response } from 'express';
import type { RequestHandler } from 'express';
import { CreateLicenseService } from '../../service/license/CreateLicenseService.js'

class CreateLicenseController {
    handle: RequestHandler = async (req: Request, res: Response) => {
        try {
            const { status, type, db_connection, db_user, db_password, valid_until, client_id, service_id } = req.body;

            const createLicenseService = new CreateLicenseService();

            const license = await createLicenseService.execute({
                status,
                type,
                db_connection,
                db_user,
                db_password,
                valid_until,
                client_id,
                service_id
            });

            res.json(license);
        } catch (error: any) {
            console.error(error.message);
            res.status(400).json({ error: error.message });
        }
    };
}

export { CreateLicenseController }