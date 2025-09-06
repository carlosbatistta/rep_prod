import type { Request, Response } from 'express';
import type { RequestHandler } from 'express';
import { CreateUserService } from '../../service/user/CreateUserService.js'

class CreateUserController {
  handle: RequestHandler = async (req: Request, res: Response) => {
    try {
      const { name, email, password, profile_id } = req.body;
  
      const createUserService = new CreateUserService();
  
      const user = await createUserService.execute({
        name,
        email,
        password,
        profile_id,
      });
  
      res.json(user);
    } catch (error: any) {
      console.error(error.message);
      res.status(400).json({ error: error.message });
    }
  };
  
}

export { CreateUserController }