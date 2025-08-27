import { Request, RequestHandler, Response } from "express";
import { ImportStockService } from "../../services/stock/ImportStockService";
import { DeleteStockService } from "../../services/stock/DeleteStockService";
import { DeleteInventProductService } from "../../services/invent_product/DeleteInventProductService";

class ImportStockController {
    handle: RequestHandler = async (req: Request, res: Response) => {
        try {
            const importStockService = new ImportStockService();
            const deleteStockService = new DeleteStockService();
            const deleteInventProductService = new DeleteInventProductService()

            const stock_del = await deleteStockService.execute();

            // Extraindo o branch_code do corpo da requisição
            const { branch_code, storage_code, date_count, document, departament, line, group, subgroup, feature } = req.body;
            const invent_product_del = await deleteInventProductService.execute({ branch_code, storage_code, date_count, document });
            // Passando um objeto com branch_code para o service
            const stock_imp = await importStockService.execute({ branch_code, storage_code, date_count, document, departament, line, group, subgroup, feature });

            res.json({ stock_imp, stock_del, invent_product_del });
        } catch (error: any) {
            console.error(error.message);
            res.status(400).json({ error: error.message });
        }
    };
}

export { ImportStockController };
