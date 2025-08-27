import { Request, Response, RequestHandler } from 'express'
import { CloseInventAddressService } from '../../services/invent_address/CloseInventAddressService';

class CloseInventAddressController {
    handle: RequestHandler = async (req: Request, res: Response) => {
        try {
            const { branch_code, storage_code, address_code, user_last_count } = req.body;

            const operAddressService = new CloseInventAddressService()

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

export { CloseInventAddressController }