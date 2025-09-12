import type { Request, Response } from 'express'
import type { RequestHandler } from 'express'
import { DeleteLicenseService } from '../../service/license/DeleteLicenseService.js';

class DeleteLicenseController {
    handle: RequestHandler = async (req: Request, res: Response) => {
        try {
            const { id } = req.body;
            const deleteLicenseService = new DeleteLicenseService();

            await deleteLicenseService.execute({ id });
            res.status(204).send();
        } catch (error: any) {
            console.error(error.message);
            res.status(400).json({ error: error.message });
        }
    }
}

export { DeleteLicenseController }