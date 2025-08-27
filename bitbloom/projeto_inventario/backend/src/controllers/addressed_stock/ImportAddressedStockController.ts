import { Request, RequestHandler, Response } from "express";
import { ImportAddressedStockService } from "../../services/addressed_stock/ImportAddressedStockService";
import { DeleteAddressedStockService } from "../../services/addressed_stock/DeleteAddressedStockService";
import { DeleteInventAddressService } from "../../services/invent_address/DeleteInventAddressService";

class ImportAddressedStockController {
    handle: RequestHandler = async (req: Request, res: Response) => {
        try {
            const importAddressedStockService = new ImportAddressedStockService()
            const deleteAddressedStockService = new DeleteAddressedStockService()
            const deleteInventAddressService = new DeleteInventAddressService()

            const addressed_stock_del = await deleteAddressedStockService.execute()
            const { branch_code, document, storage_code, date_count, address_code } = req.body
            const invent_address_del = await deleteInventAddressService.execute({ branch_code, storage_code, date_count, document })
            const addressed_stock_imp = await importAddressedStockService.execute({ branch_code, document, storage_code, date_count, address_code })

            res.json({ addressed_stock_imp, addressed_stock_del, invent_address_del })
        } catch (error: any) {
            console.error(error.message)
            res.status(400).json({ error: error.message })
        }
    }
}

export { ImportAddressedStockController }