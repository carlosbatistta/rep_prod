import type { Request, Response } from 'express';
import type { RequestHandler } from 'express';
import { CreateService } from '../../service/service/CreateService.js'

class CreateServiceController {
    handle: RequestHandler = async (req: Request, res: Response) => {
        try {
            const { code, name } = req.body;

            const createService = new CreateService();

            const service = await createService.execute({
                code,
                name,
            });
            res.json(service);
        }catch (error: any) {
            console.error(error.message);
            res.status(400).json({ error: error.message });
        }
    }
}

export { CreateServiceController }