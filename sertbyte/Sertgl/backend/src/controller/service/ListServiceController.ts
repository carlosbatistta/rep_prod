import type { Request, Response } from 'express'
import type { RequestHandler } from 'express'
import { ListService } from '../../service/service/ListService.js'

class ListServiceController {
    handle: RequestHandler = async (req: Request, res: Response): Promise<void> => {
        try {
            const listService = new ListService()
            const services = await listService.execute()
            res.json(services)
        } catch (error: any) {
            console.error(error.message)
            res.status(400).json({ error: error.message })
        }
    }
}

export { ListServiceController }
