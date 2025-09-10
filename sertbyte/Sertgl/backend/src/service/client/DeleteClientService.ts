import type { Request, Response } from 'express'
import type { RequestHandler } from 'express'
import {DeleteClientService} from './DeleteClientService.js';

class DeleteClientController {
    handle: RequestHandler = async (req: Request, res: Response) => {
        try {
            const { id } = req.body

            const deleteClientService = new DeleteClientService()

            const client = await deleteClientService.execute({
                id
            })

            res.json(client)
        } catch (error: any) {
            console.error(error.message)
            res.status(400).json({ error: error.message })
        }
    }
}

export { DeleteClientController }