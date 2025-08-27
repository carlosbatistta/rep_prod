import {Request, RequestHandler, Response} from 'express';
import {DeleteProfileService} from '../../services/profile/DeleteProfileService';

class DeleteProfileController {
    handle: RequestHandler = async (req: Request, res: Response) => {
        try {
            const { id } = req.body

            const deleteProfileService = new DeleteProfileService()

            const profile = await deleteProfileService.execute({
                id
            })

            res.json(profile)
        } catch (error: any) {
            console.error(error.message)
            res.status(400).json({ error: error.message })
        }
    }
}

export { DeleteProfileController }