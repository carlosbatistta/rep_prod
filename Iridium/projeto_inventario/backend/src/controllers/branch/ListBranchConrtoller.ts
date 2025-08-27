import { Request, Response, RequestHandler } from 'express'
import { ListBranchService } from '../../services/branch/ListBranchSerice';

class ListBranchController{
    handle: RequestHandler = async (req: Request, res: Response) => {
        try{
            const listBranchService = new ListBranchService()
            const branches = await listBranchService.execute()
        }catch(error){
            console.error(error.message);
            res.status(400).json({ error: error.message })
        }
    }
}
export {ListBranchController}