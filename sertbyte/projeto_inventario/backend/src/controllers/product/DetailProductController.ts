import { Request, Response, RequestHandler } from 'express'
import { DetailProductService } from '../../services/product/DetailProductService'

class DetailProductController {
    handle: RequestHandler = async (req: Request, res: Response) => {
        try {
            const { code } = req.body;
            const detailProductService = new DetailProductService();
            const product = await detailProductService.execute({
                code,
            });
            res.json(product);
        } catch (error: any) {
            console.error(error.message);
            res.status(400).json({ error: error.message })
        }
    }
}

export { DetailProductController }