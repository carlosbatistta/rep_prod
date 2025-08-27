import { Request, Response, RequestHandler } from 'express'
import { OpenAddressService } from '../../services/invent_address/OpenAddressService';

class OpenAddressController {
    handle: RequestHandler = async (req: Request, res: Response) => {
        try {
            const { branch_code, storage_code, address_code, user_last_count } = req.body;

            const operAddressService = new OpenAddressService()

            const open_address = await operAddressService.execute({
                branch_code,
                storage_code,
                address_code,
                user_last_count
            });
            res.json(open_address);
        } catch (error: any) {
            console.error(error.message);
            res.status(400).json({ error: error.message })
        }

    }

}

export { OpenAddressController }