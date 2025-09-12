import type { Request, Response } from 'express'
import type { RequestHandler } from 'express'
import { ListLicenseService } from '../../service/license/ListLicenseService.js'

class ListLicenseController {
    handle: RequestHandler = async (req: Request, res: Response): Promise<void> => {
        try {
            const listLicenseService = new ListLicenseService()
            const licenses = await listLicenseService.execute()
            res.json(licenses)
        } catch (error: any) {
            console.error(error.message)
            res.status(400).json({ error: error.message })
        }
    }
}

export { ListLicenseController }
