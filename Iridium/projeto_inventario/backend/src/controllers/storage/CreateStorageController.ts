import { RequestHandler, Request, Response } from 'express'
import { CreateStorageService } from '../../services/storage/CreateStorageService'

class CreateStorageController {
    handle: RequestHandler = async (req: Request, res: Response) => {
        try {
            const { name, code } = req.body

            const createStorageService = new CreateStorageService()

            const storage = await createStorageService.execute({
                name,
                code,
            })

            res.json(storage)
        } catch (error: any) {
            console.error(error.message)
            res.status(400).json({ error: error.message })
        }
    }
}

export {CreateStorageController}