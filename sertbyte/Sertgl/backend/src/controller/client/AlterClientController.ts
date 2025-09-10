import type { Request, Response } from 'express'
import type { RequestHandler } from 'express'
import { AlterClientService } from '../../service/client/AlterClientService.js';

class AlterClientController {
    handle: RequestHandler = async (req: Request, res: Response) => {
        try {
            const { id, cnpj, name_fantasy, name_company, ie, status, city, cod_city, cep, street, district, number, email } = req.body;

            const alterClientService = new AlterClientService();

            const client = await alterClientService.execute({
                id,
                cnpj,
                name_fantasy,
                name_company,
                ie,
                status,
                city,
                cod_city,
                cep,
                street,
                district,
                number,
                email
            });

            res.json(client);
        } catch (error: any) {
            console.error(error.message);
            res.status(400).json({ error: error.message });
        }
    }
}

export { AlterClientController }