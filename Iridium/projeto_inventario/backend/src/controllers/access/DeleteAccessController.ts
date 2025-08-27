import { RequestHandler, Request, Response } from 'express'
import { DeleteAccessService } from '../../services/access/DeleteAccessService'

class DeleteAccessController {
    handle: RequestHandler = async (req: Request, res: Response) => {
        try {
            const { id } = req.body;

            const deleteAccessService = new DeleteAccessService();

            const access = await deleteAccessService.execute({
                id
            });

            res.json(access);
        } catch (error: any) {
            console.error(error.message);
            res.status(400).json({ error: error.message });
        }
    }
}