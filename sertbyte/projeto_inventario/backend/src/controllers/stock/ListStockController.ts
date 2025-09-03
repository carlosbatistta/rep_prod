import { Request, Response, RequestHandler } from 'express'
import { ListStockService } from '../../services/stock/ListStockService';

class ListStockController {
    handle: RequestHandler = async (req: Request, res: Response) => {
        try {
            const { storage_code, branch_code, cost, wms_control, unbalanced, reservation } = req.body;
            const listStockService = new ListStockService();
            const stock = await listStockService.execute({
                storage_code, cost, wms_control, branch_code, reservation, unbalanced
            });
            res.json(stock)
        } catch (error: any) {
            console.error(error.message);
            res.status(400).json({ error: error.message })
        }
    }
}

export { ListStockController }