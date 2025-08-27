import { Request, Response, RequestHandler } from 'express'
import { CreateProfileService } from '../../services/profile/CreateProfileService'

class CreateProfileController {
    handle: RequestHandler = async (req: Request, res: Response) => {
        try {
            const { name, nivel } = req.body;

            const createProfileService = new CreateProfileService();

            const profile = await createProfileService.execute({
                name,
                nivel

            });

            res.json(profile);
        } catch (error: any) {
            console.error(error.message);
            res.status(400).json({ error: error.message });
        }
    }
}

export { CreateProfileController }