import type { Request, Response } from 'express'
import type { RequestHandler } from 'express'  
import { AlterClientService } from '../../service/client/AlterClientService.js';

class AlterClientController {
    handle: RequestHandler = async (req: Request, res: Response) => {
        try {
            const { name, cnpj, name_fantasy, name_company, ie, city, cod_city, cep, street, district, number, complement, email } = req.body;

            const alterClientService = new AlterClientService();

            const client = await alterClientService.execute({
                name,
                cnpj,
                name_fantasy,
                name_company,
                ie,
                city,
                cod_city,
                cep,
                street,
                district,
                number,
                complement,
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