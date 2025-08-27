import { RequestHandler, Request, Response } from 'express'
import { DeleteInventService } from '../../services/invent/DeleteInventService'

class DeleteInventController {
    handle: RequestHandler = async (req: Request, res: Response) =>{
        try{
            const { branch_code, storage_code, document, date_count} = req.body

            const deletInventService = new DeleteInventService();

            const invent = await deletInventService.execute({
                branch_code, storage_code, document, date_count
            })
            res.json(invent)
        }catch (error: any){
            console.error(error.message)
            res.status(400).json({ error: error.message })
        }
    }
}

export {DeleteInventController}