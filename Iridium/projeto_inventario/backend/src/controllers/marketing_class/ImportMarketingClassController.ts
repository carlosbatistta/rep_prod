import { Request, RequestHandler, Response } from "express"
import { DeleteMarketingClassService } from "../../services/marketing_class/DeleteMarketingClassService";
import { ImportMarketingClassService } from "../../services/marketing_class/ImportMarketingClassService";

class ImportMarketingClassController{
    handle: RequestHandler = async (req: Request, res: Response) => {
        try{
            const importMarketingClassService = new ImportMarketingClassService()
            const deleteMarketingClassService = new DeleteMarketingClassService()

            await deleteMarketingClassService.execute()
            const marketing_imp = await importMarketingClassService.execute()

            res.json(marketing_imp)
        }catch(error){
            console.error(error.message);
            res.status(400).json({ error: error.message });
        }
    }
}

export {ImportMarketingClassController}
