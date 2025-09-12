import type { Request, Response } from 'express'
import type { RequestHandler } from 'express'
import { ListUserService } from '../../service/user/ListUserService.js'

class ListUserController {
    handle: RequestHandler = async (req: Request, res: Response): Promise<void> => {
        try {
            const listUserService = new ListUserService()
            const users = await listUserService.execute()
            res.json(users)
        } catch (error: any) {
            console.error(error.message)
            res.status(400).json({ error: error.message })
        }
    }
}

export { ListUserController }
