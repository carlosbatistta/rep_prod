import type { Request, Response } from 'express'
import type { RequestHandler } from 'express'
import { DeleteClientService } from '../../service/client/DeleteClientService.js';

class DeleteClientController {
    handle: RequestHandler = async (req: Request, res: Response) => {
        try {
            const { id } = req.body;

            const deleteClientService = new DeleteClientService();

            await deleteClientService.execute({ id });

            res.status(204).send();
        } catch (error: any) {
            console.error(error.message);
            res.status(400).json({ error: error.message });
        }
    }
}

export { DeleteClientController }