import type { Request, Response } from 'express'
import type { RequestHandler } from 'express'
import { AlterLicenseService } from '../../service/license/AlterLicenseService.js';

class AlterLicenseController {
    handle: RequestHandler = async (req: Request, res: Response) => {
        try {
            const { id, status, type, db_connection, db_user, db_password, valid_until, client_id, service_id } = req.body;
            const alterLicenseService = new AlterLicenseService();
            const license = await alterLicenseService.execute({ id, status, type, db_connection, db_user, db_password, valid_until, client_id, service_id });
            return res.json(license);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export { AlterLicenseController }