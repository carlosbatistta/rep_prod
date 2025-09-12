import type { Request, Response } from 'express'
import type { RequestHandler } from 'express'
import { ListClientService } from '../../service/client/ListClientService.js'

class ListClientController {
    handle: RequestHandler = async (req: Request, res: Response): Promise<void> => {
        try {
            const listClientService = new ListClientService()
            const clients = await listClientService.execute()
            res.json(clients)
        } catch (error: any) {
            console.error(error.message)
            res.status(400).json({ error: error.message })
        }
    }
}

export { ListClientController }