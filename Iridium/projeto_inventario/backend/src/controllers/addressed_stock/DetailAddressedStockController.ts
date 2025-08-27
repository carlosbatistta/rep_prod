import { Request, Response, RequestHandler } from 'express'
import { DetailAddressedStockService } from '../../services/addressed_stock/DetailAddressedStockService';

class DetailAddressedStockController {
    handle: RequestHandler = async (req: Request, res: Response) => {
        try {
            const { address_code } = req.body;
            const detailAddressedStockService = new DetailAddressedStockService();
            const addressed_stock = await detailAddressedStockService.execute({
                address_code
            });
            res.json(addressed_stock);
        } catch (error: any) {
            console.error(error.message);
            res.status(400).json({ error: error.message })
        }
    }
}

export { DetailAddressedStockController }
