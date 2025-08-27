import { RequestHandler, Request, Response } from 'express'
import { AlterVirtualLocation } from '../../services/virtual_location/AlterVirtualLocation'

class AlterVirtualLocationController {
    handle: RequestHandler = async (req: Request, res: Response) => {
        try {
            const { code, name } = req.body

            const alterVirtualLocation = new AlterVirtualLocation()

            const virtualLocation = await alterVirtualLocation.execute({
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