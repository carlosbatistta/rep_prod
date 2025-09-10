import type { Request, Response } from 'express'
import type { RequestHandler } from 'express'
import { CreateClientService } from '../../service/client/CreateClientService.js'

class CreateClientController {
    handle: RequestHandler = async (req: Request, res: Response) => {
        try {
            const { cnpj, name_fantasy, name_company, status, ie, city, cod_city, cep, street, district, number, email } = req.body;

            const createClientService = new CreateClientService();

            const client = await createClientService.execute({              
                id: undefined,
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

export { CreateClientController }