import { RequestHandler, Request, Response } from 'express'
import { DeleteVirtualLocationService } from '../../services/virtual_location/DeleteVirtualLocationService'

class DeleteVirtualLocationController {
    handle: RequestHandler = async (req: Request, res: Response) => {
        try {
            const { id } = req.body

            const deleteVirtualLocationService = new DeleteVirtualLocationService()

            const virtualLocation = await deleteVirtualLocationService.execute({
                id,
            })

            res.json(virtualLocation)
        } catch (error: any) {
            console.error(error.message)
            res.status(400).json({ error: error.message })
        }
    }
}