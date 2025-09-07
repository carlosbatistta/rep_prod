import { Router, type Request, type Response } from 'express';
import { isAuthenticated } from './middlewares/isAuthenticated.js';
import { CreateUserController } from './controller/user/CreateUserController.js'
import { AuthUserController } from './controller/user/AuthUserController.js'
import { DetailuserController } from './controller/user/DetailUserController.js'
const router = Router()


//-- ROTAS USER --
router.post('/users', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)
router.get('/me', (req, res, next) => isAuthenticated(req, res, next, 0), new DetailuserController().handle)

router.get('/teste', (req: Request, res: Response) => {
    return res.json({ok: true})
})

export { router }