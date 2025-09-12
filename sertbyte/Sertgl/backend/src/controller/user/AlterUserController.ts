import type { Request, Response } from 'express'
import type { RequestHandler } from 'express'
import { AlterUserService } from '../../service/user/AlterUserService.js';

class AlterUserController {
    handle: RequestHandler = async (req: Request, res: Response) => {
        try {
            const { id, name, email, password } = req.body;
            const alterUserService = new AlterUserService();
            const user = await alterUserService.execute({ id, name, email, password });
            return res.json(user);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export { AlterUserController }