import type { Request, Response } from 'express'
import type { RequestHandler } from 'express'
import { DeleteService } from '../../service/service/DeleteService.js';

class DeleteServiceController {
    handle: RequestHandler = async (req: Request, res: Response) => {
        try {
            const { id } = req.body

            const deleteService = new DeleteService()

            const service = await deleteService.execute({
                id
            })
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' })
        }
    }
}

export { DeleteServiceController }