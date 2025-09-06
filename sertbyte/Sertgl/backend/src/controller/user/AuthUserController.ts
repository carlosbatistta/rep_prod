import type { Request, Response } from 'express';
import type { RequestHandler } from 'express';
import { AuthUserService } from '../../service/user/AuthUserService.js'

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