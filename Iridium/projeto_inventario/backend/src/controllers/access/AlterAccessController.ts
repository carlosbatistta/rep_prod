import{Request, Response, RequestHandler} from 'express';
import { AlterAccessService } from '../../services/access/AlterAccessService';

class AlterAccessController {
    handle: RequestHandler = async (req: Request, res: Response) => {
        try {
            const { id, permission, profile_id, access_nivel } = req.body;

            const alterAccessService = new AlterAccessService();

            const access = await alterAccessService.execute({
               id, permission, profile_id, access_nivel
            });

            res.json(access);
        } catch (error: any) {
            console.error(error.message);
            res.status(400).json({ error: error.message });
        }
    }
}

export { AlterAccessController }