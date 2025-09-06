import type { Request, Response } from 'express';
import type { RequestHandler } from 'express';
import { DetailUserService } from '../../service/user/DetailUserService.js'

class DetailuserController {
  handle: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {

      const user_id = req.body.user_id;

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