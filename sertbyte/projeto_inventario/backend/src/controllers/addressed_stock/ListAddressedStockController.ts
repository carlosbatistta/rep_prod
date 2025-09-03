import { Request, Response, RequestHandler } from 'express'
import { ListAddressedStockService } from '../../services/addressed_stock/ListAddressedStockService';

class ListAddressedStockController {
    handle: RequestHandler = async (req: Request, res: Response) => {
        try {
            const { product_code, storage_code, branch_code, reserve_quantity, transfer_quantity, address_code } = req.body;
            const listAddressedStockService = new ListAddressedStockService();
            const addressed_stock = await listAddressedStockService.execute({
                product_code, storage_code, branch_code, reserve_quantity, transfer_quantity, address_code
            });
            res.json(addressed_stock)
        } catch (error: any) {
            console.error(error.message);
            res.status(400).json({ error: error.message })
        }
    }
}

export { ListAddressedStockController }