import { RequestHandler, Request, Response } from 'express'
import { AlterInventService } from '../../services/invent/AlterInventService'

class AlterInventController {
    handle: RequestHandler = async (req: Request, res: Response) => {
        try {
            const { document, filial, date_count, storage_code, accuracy_percent, accuracy_quanty, accuracy_value, total_inventory_quanty, total_inventory_value, total_stock_quanty, total_stock_value, difference_quanty, difference_value } = req.body;

            const alterInventService = new AlterInventService();

            const invent = await alterInventService.execute({
                document,
                branch_code: filial,
                date_count,
                storage_code,
                accuracy_percent,
                accuracy_quanty,
                accuracy_value,
                total_inventory_quanty,
                total_inventory_value,
                total_stock_quanty,
                total_stock_value,
                difference_quanty,
                difference_value
            })
            res.json(invent)
        } catch (error: any) {
            console.error(error.message)
            res.status(400).json({ error: error.message })
        }
    }
}

export { AlterInventController }