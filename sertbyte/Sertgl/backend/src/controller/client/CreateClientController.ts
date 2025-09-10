import type { Request, Response } from 'express'
import type { RequestHandler } from 'express'
import { CreateClientService } from '../../service/client/CreateClientService.js'

class CreateClientController {
    handle: RequestHandler = async (req: Request, res: Response) => {
        try {
            const { name, cnpj, name_fantasy, name_company, ie, city, cod_city, cep, street, district, number, complement, email } = req.body;

            const createClientService = new CreateClientService();

            const client = await createClientService.execute({
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

export { CreateClientController }