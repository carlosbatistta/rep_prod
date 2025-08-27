import { Request, Response, RequestHandler } from 'express'
import { CreateInventService } from '../../services/invent/CreateInventService'

class CreateInventController {
    handle: RequestHandler = async (req: Request, res: Response) => {
        try {
            const { date_count, date_valid, branch_code, storage_code, invent_type, offline } = req.body;

            const createInventService = new CreateInventService();

            const invent = await createInventService.execute({
                date_count,
                date_valid,
                branch_code,
                storage_code,
                invent_type,
                offline,               
            });
            res.json(invent);
        } catch (error: any) {
            console.error(error.message);
            res.status(400).json({ error: error.message })
        }
    }
}

export { CreateInventController }