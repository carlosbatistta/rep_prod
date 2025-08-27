import { RequestHandler, Request, Response } from 'express'
import { CreateAccessService } from '../../services/access/CreateAccessService'

class CreateAccessController {
    handle: RequestHandler = async (req: Request, res: Response) => {
        try {
            const { permission, profile_id, access_nivel } = req.body;

            const createAccessService = new CreateAccessService();

            const access = await createAccessService.execute({
                permission, profile_id, access_nivel
            });

            res.json(access);
        } catch (error: any) {
            console.error(error.message);
            res.status(400).json({ error: error.message });
        }
    }
}

export { CreateAccessController }