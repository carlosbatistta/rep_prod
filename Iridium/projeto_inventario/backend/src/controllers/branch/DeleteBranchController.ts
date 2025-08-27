import { RequestHandler, Request, Response } from 'express'
import { DeleteBranchService } from '../../services/branch/DeleteBranchService'

class DeleteBranchController {
    handle: RequestHandler = async (req: Request, res: Response) => {
        try {

            const deleteBranchService = new DeleteBranchService()

            const branch = await deleteBranchService.execute()

            res.json(branch)
        } catch (error: any) {
            console.error(error.message)
            res.status(400).json({ error: error.message })
        }
    }
}

export { DeleteBranchController }