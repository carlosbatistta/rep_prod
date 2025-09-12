import type { Request, Response } from 'express'
import type { RequestHandler } from 'express'
import { DeleteUserService } from '../../service/user/DeleteUserService.js';

class DeleteUserController {
    handle: RequestHandler = async (req: Request, res: Response) => {
        try {
            const { id } = req.body;
            const deleteUserService = new DeleteUserService();
            await deleteUserService.execute({ id });
            return res.status(204).send();
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export { DeleteUserController }