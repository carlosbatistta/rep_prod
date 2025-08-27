import { RequestHandler, Request, Response } from 'express'
import { DeleteStorageService } from '../../services/storage/DeleteStorageService'

class DeleteStorageController {
    handle: RequestHandler = async (req: Request, res: Response) => {
        try {
            const { id } = req.params

            const deleteStorageService = new DeleteStorageService()

            const storage = await deleteStorageService.execute({ id })

            res.json(storage)
        } catch (error: any) {
            console.error(error.message)
            res.status(400).json({ error: error.message })
        }
    }
}

export {DeleteStorageController}
