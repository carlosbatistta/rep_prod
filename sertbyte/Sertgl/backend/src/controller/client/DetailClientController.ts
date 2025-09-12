import type { Request, Response } from 'express'
import type { RequestHandler } from 'express'
import { DetailUserService } from '../../service/user/DetailUserService.js'

class DetailuserController {
    handle: RequestHandler = async (req: Request, res: Response): Promise<void> => {
        try {
            const cnpj = req.body.cnpj

            const detailUserService = new DetailUserService()

            const user = await detailUserService.execute(cnpj)

            res.json(user)
        } catch (error: any) {
            console.error(error.message)
            res.status(400).json({ error: error.message })
        }
    }
}

export { DetailuserController }