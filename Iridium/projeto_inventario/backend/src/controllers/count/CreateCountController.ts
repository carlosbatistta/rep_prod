import { Request, Response, RequestHandler } from 'express'
import { CreateCountService } from '../../services/count/CreateCountService'

class CreateProfileController{
    handle: RequestHandler = async (req: Request, res: Response) => {
        try {
            const { count_quantity, difference, status, user_name, product_code, product_desc, storage_code, branch_code, address_code } = req.body;

            const createCountService = new CreateCountService();

            const count = await createCountService.execute({
                count_quantity,
                difference,
                status,
                user_name,
                product_code,
                product_desc,
                storage_code,
                branch_code,
                address_code

            });

            res.json(count);
        } catch (error: any) {
            console.error(error.message);
            res.status(400).json({ error: error.message });
        }
    }
}