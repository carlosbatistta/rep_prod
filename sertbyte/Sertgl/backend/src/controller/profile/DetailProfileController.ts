import type { Request, Response } from 'express'
import type { RequestHandler } from 'express'
import { DetailProfileService } from '../../service/profile/DetailProfileService.js'

class DetailProfileController {
    handle: RequestHandler = async (req: Request, res: Response): Promise<void> => {
        try {
            const code = req.body.code

            const detailProfileService = new DetailProfileService()
            const profile = await detailProfileService.execute(Number(code))
            res.json(profile)
        } catch (error: any) {
            console.error(error.message)
            res.status(400).json({ error: error.message })
        }
    }
}

export { DetailProfileController }