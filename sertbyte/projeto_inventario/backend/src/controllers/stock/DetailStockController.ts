import { Request, Response, RequestHandler } from 'express'
import { DetailStockService } from '../../services/stock/DetailStockService';

class DetailStockController {
    handle: RequestHandler = async (req: Request, res: Response) => {
        try {
            const { product_code, storage_code } = req.body;
            const detailStockService = new DetailStockService();
            const stock = await detailStockService.execute({
                product_code, storage_code
            });

            res.json(stock);
        } catch (error: any) {
            console.error(error.message);
            res.status(400).json({ error: error.message })
        }
    }
}

export { DetailStockController }