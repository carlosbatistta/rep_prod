import { Request, RequestHandler, Response } from "express";
import { ImportAddressService } from "../../services/address/ImportAddressService";

class ImportAddressController{

    handle: RequestHandler = async (req: Request, res: Response) => {
        try{
            const importAdrresService = new ImportAddressService()

            const {branch_code, storage_code} = req.body
            const address = await importAdrresService.execute({
                branch_code, storage_code
            })

            res.json({address})
            
        }catch (error){
            console.error(error.message);
            res.status(400).json({ error: error.message });
        }
    }
}

export {ImportAddressController}