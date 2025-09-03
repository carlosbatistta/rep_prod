import { Request, RequestHandler, Response } from 'express'
import { CreateUserService } from '../../services/user/CreateUserService'

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