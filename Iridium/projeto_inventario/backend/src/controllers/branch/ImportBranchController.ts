import { Request, RequestHandler, Response } from "express";
import { ImportBranchService } from "../../services/branch/ImportBranchService";
import { DeleteBranchService } from "../../services/branch/DeleteBranchService";

class ImportBranchController {

    handle: RequestHandler = async (req: Request, res: Response) => {
        try {

            const importBranchService = new ImportBranchService()
            const deleteBranchService = new DeleteBranchService()
            const {branch_code, address} = req.body

            await deleteBranchService.execute()
            const branch_imp = await importBranchService.execute({
                branch_code, address
            })

            res.json({ branch_imp });

        } catch (error) {
            console.error(error.message);
            res.status(400).json({ error: error.message });
        }
    }
}

export { ImportBranchController }