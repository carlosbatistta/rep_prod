import { Request, Response, RequestHandler } from 'express'
import { ListInventService } from '../../services/invent/ListInventService';

class ListInventController{
    handle: RequestHandler = async (req: Request, res: Response) => {
        try{
            const {storage_code, branch_code} = req.body
            const listInventService = new ListInventService()
            const invents = await listInventService.execute({
                storage_code, branch_code
        })
        res.json(invents)
        }catch(error){
            console.error(error.message);
            res.status(400).json({ error: error.message })
        }
    } 
}

export {ListInventController}