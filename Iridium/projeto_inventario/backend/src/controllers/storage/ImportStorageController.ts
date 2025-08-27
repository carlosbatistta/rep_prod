import { Request, RequestHandler, Response } from "express";
import { ImportStorageService } from "../../services/storage/ImportStorageService";
import { DeleteStorageService } from "../../services/storage/DeleteStorageService";

class ImportStorageController {

    handle: RequestHandler = async (req: Request, res: Response) => {
        try{

            const importStorageService = new ImportStorageService()
            const deleteStorageService = new DeleteStorageService()

            const storage_del = await deleteStorageService.execute()
            const storage_imp = await importStorageService.execute()
        
            res.json({storage_del, storage_imp})
        }
        catch(error){
            console.error(error.message);
            res.status(400).json({ error: error.message });
        }
    } 
}

export {ImportStorageController}