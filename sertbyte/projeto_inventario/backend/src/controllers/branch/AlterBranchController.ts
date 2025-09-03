import { RequestHandler, Request, Response } from 'express'
import { AlterBranchService } from '../../services/branch/AlterBranchService'

class AlterBranchController {
    handle: RequestHandler = async (req: Request, res: Response) => {
        try {
            const { id, name, code, status, address } = req.body

            const alterBranchService = new AlterBranchService()

            const branch = await alterBranchService.execute({
                id,
                name,
                code,
                status,
                address,
            })

            res.json(branch)
        } catch (error: any) {
            console.error(error.message)
            res.status(400).json({ error: error.message })
        }
    }
}

export { AlterBranchController }