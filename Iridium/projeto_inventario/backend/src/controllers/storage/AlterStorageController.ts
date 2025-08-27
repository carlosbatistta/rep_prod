import { RequestHandler, Request, Response } from 'express'
import { AlterStorageService } from '../../services/storage/AlterStorageService'

class AlterStorageController {
    handle: RequestHandler = async (req: Request, res: Response) => {
        try {
            const { id, code, name } = req.body

            const alterStorageService = new AlterStorageService()

            const storage = await alterStorageService.execute({
                id,
                code,
                name,
            })

            res.json(storage)
        } catch (error: any) {
            console.error(error.message)
            res.status(400).json({ error: error.message })
        }
    }
}