import type { Request, Response } from 'express'
import type { RequestHandler } from 'express'
import { DetailService } from '../../service/service/DetailService.js'

class DetailServiceController {
    handle: RequestHandler = async (req: Request, res: Response): Promise<void> => {
        try {
            const code = req.body.code

            const detailService = new DetailService()
            const service = await detailService.execute(Number(code))
            res.json(service)
        } catch (error: any) {
            console.error(error.message)
            res.status(400).json({ error: error.message })
        }
    }
}

export { DetailServiceController }