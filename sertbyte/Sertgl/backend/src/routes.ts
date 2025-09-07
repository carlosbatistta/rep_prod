import { Router, type Request, type Response } from 'express';

import { CreateUserController } from './controller/user/CreateUserController'
import { AuthUserController } from './controller/user/AuthUserController'
import { DetailuserController } from './controller/user/DetailUserController'

const router = Router()

router.get('/teste', (req: Request, res: Response) => {
    return res.json({ok: true})
})

export { router }