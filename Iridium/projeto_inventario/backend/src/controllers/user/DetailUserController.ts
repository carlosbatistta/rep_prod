import { Request, RequestHandler, Response } from 'express'
import { DetailUserService } from '../../services/user/DetailUserService'
import { promises } from 'dns';

class DetailuserController {
  handle: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {

      const user_id = req.user_id;

      const detailUserService = new DetailUserService();

      const user = await detailUserService.execute(user_id);

      res.json(user);

    } catch (error: any) {
      console.error(error.message);
      res.status(400).json({ error: error.message });
    }
  }
}

export { DetailuserController }