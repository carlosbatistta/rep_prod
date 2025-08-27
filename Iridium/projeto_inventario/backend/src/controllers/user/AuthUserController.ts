import {Request, RequestHandler, Response} from 'express';
import { AuthUserService } from '../../services/user/AuthUserService'

class AuthUserController{
  handle: RequestHandler = async (req: Request, res: Response) => {
    try {
      const {email, password} = req.body;

      const authUserService = new AuthUserService();

      const auth = await authUserService.execute({
        email,
        password
      })

      res.json(auth);

    } catch(error: any) {
      console.error(error.message);
      res.status(400).json({ error: error.message });
    }
  }

}

export { AuthUserController }