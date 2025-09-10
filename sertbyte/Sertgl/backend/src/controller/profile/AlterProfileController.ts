import type { Request, Response } from 'express'
import type { RequestHandler } from 'express'
import { AlterProfileService } from '../../service/profile/AlterProfileService.js';

class AlterProfileController {
    handle: RequestHandler = async (req: Request, res: Response) => {
        try {
            const { id, name, nivel } = req.body;

            const alterProfileService = new AlterProfileService();

            const profile = await alterProfileService.execute({
               id, name, nivel
            });

            res.json(profile);
        } catch (error: any) {
            console.error(error.message);
            res.status(400).json({ error: error.message });
        }
    }
}

export { AlterProfileController }