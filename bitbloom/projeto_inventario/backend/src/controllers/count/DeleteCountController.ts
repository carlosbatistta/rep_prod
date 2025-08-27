import { RequestHandler, Request, Response } from 'express'
import { DeleteCountService } from '../../services/count/DeleteCountService'

class DeleteCountController {
    handle: RequestHandler = async (req: Request, res: Response) => {
        try {
            const { id } = req.body

            const deleteCountService = new DeleteCountService()

            const count = await deleteCountService.execute({
                id
            })

            res.json(count)
        } catch (error: any) {
            console.error(error.message)
            res.status(400).json({ error: error.message })
        }
    }
}

export { DeleteCountController }