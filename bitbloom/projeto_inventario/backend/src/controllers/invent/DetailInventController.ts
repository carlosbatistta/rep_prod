import { Request, Response, RequestHandler } from 'express'
import { DetailInventService } from '../../services/invent/DetailInventService';

class DetailInventController {
    handle: RequestHandler = async (req: Request, res: Response) => {
        try {
            const { branch_code, document, date_count } = req.body;
            const detailInventService = new DetailInventService();
            const invent = await detailInventService.execute({
                branch_code, document, date_count
            });

            res.json(invent);
        } catch (error: any) {
            console.error(error.message);
            res.status(400).json({ error: error.message })
        }
    }
}

export { DetailInventController }