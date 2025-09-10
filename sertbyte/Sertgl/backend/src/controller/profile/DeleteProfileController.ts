import type { Request, Response } from 'express'
import type { RequestHandler } from 'express'
import {DeleteProfileService} from '../../service/profile/DeleteProfileService.js';

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