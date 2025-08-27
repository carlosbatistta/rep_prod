import { Request, RequestHandler, Response } from "express"
import { ImportProductService } from "../../services/product/ImportProductService"
import { DeleteProductService } from "../../services/product/DeleteProductService"

class ImportProductController {
    handle: RequestHandler = async (req: Request, res: Response) => {
        try {
            const importProductService = new ImportProductService()
            const deleteProductService = new DeleteProductService()

            await deleteProductService.execute()
            const product_imp = await importProductService.execute()

            res.json(product_imp);
        } catch (error: any) {
            console.error(error.message);
            res.status(400).json({ error: error.message });
        }
    }
}

export {ImportProductController}