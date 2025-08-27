import { RequestHandler, Request, Response } from 'express'
import { CreateVirtualLocationService } from '../../services/virtual_location/CreateVirtualLocationService'

class CreateVirtualLocationController {
    handle: RequestHandler = async (req: Request, res: Response) => {
        try {
            const { id, code, name } = req.body

            const createVirtualLocationService = new CreateVirtualLocationService()

            const virtualLocation = await createVirtualLocationService.execute({
                id,
                code,
                name,
            })

            res.json(virtualLocation)
        } catch (error: any) {
            console.error(error.message)
            res.status(400).json({ error: error.message })
        }
    }
}