import { RequestHandler, Request, Response } from 'express'
import { AlterCountService } from '../../services/count/AlterCountService'

class AlterCountController {
    handle: RequestHandler = async (req: Request, res: Response) => {
        try {
            const { count_quantity, difference, status, user_name, product_code, product_desc, storage_code, branch_code, address_code } = req.body

            const alterCountService = new AlterCountService()

            const count = await alterCountService.execute({
                count_quantity,
                difference,
                status,
                user_name,
                product_code,
                product_desc,
                storage_code,
                branch_code,
                address_code
            })

            res.json(count)
        } catch (error: any) {
            console.error(error.message)
            res.status(400).json({ error: error.message })
        }
    }
}