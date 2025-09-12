import type { Request, Response } from 'express'
import type { RequestHandler } from 'express'
import { DetailLicenseService } from '../../service/license/DetailLicenseService.js'

class DetailLicenseController {
    handle: RequestHandler = async (req: Request, res: Response): Promise<void> => {
        try {
            const { code } = req.params
            const detailLicenseService = new DetailLicenseService()
            const license = await detailLicenseService.execute(Number(code))
            res.json(license)
        } catch (error: any) {
            console.error(error.message)
            res.status(400).json({ error: error.message })
        }
    }
}

export { DetailLicenseController }
