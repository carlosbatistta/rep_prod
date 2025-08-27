import { Request, Response, RequestHandler } from 'express'
import { ListProductService } from '../../services/product/ListProductService'

class ListProductController {
    handle: RequestHandler = async (req: Request, res: Response) => {
        try {
            const { storage_code } = req.body
            const listProductService = new ListProductService();
            const products = await listProductService.execute({
                storage_code
            });
            res.json(products)
        } catch (error: any) {
            console.error(error.message);
            res.status(400).json({ error: error.message })
        }
    }
}

export { ListProductController }