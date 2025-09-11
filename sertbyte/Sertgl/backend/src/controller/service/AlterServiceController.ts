import type { Request, Response } from 'express'
import type { RequestHandler } from 'express'
import { AlterService } from '../../service/service/AlterService.js';

class AlterServiceController {
    handle: RequestHandler = async (req: Request, res: Response) => {
        try {
            const { name, code } = req.body;

            const alterService = new AlterService();

            const service = await alterService.execute({
                code,
                name
            })
            res.json(service);
        } catch (error: any) {
            console.error(error.message);
            res.status(400).json({ error: error.message });
        }
    }
}

export { AlterServiceController }