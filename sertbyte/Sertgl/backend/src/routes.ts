import { Router, type Request, type Response } from 'express';
import { isAuthenticated } from './middlewares/isAuthenticated.js';
import { CreateUserController } from './controller/user/CreateUserController.js'
import { AuthUserController } from './controller/user/AuthUserController.js'
import { DetailuserController } from './controller/user/DetailUserController.js'
import { CreateProfileController } from './controller/profile/CreateProfileController.js'
import { DeleteProfileController } from './controller/profile/DeleteProfileController.js';
import { AlterProfileController } from './controller/profile/AlterProfileController.js';
import { CreateClientController } from './controller/client/CreateClientController.js';
import { DeleteClientController } from './controller/client/DeleteClientController.js';
import { AlterClientController } from './controller/client/AlterClientController.js';
import { CreateServiceController } from './controller/service/CreateServiceController.js';
import { DeleteServiceController } from './controller/service/DeleteServiceController.js';
import { AlterServiceController } from './controller/service/AlterServiceController.js';
const router = Router()


//-- ROTAS USER --
router.post('/users', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)
router.get('/me', (req, res, next) => isAuthenticated(req, res, next, 0), new DetailuserController().handle)

//-- ROTAS PROFILE
router.post('/profile/add', new CreateProfileController().handle)
router.delete('/profile/remove', (req, res, next) => isAuthenticated(req, res, next, 0), new DeleteProfileController().handle)
router.post('/profile/alter', (req, res, next) => isAuthenticated(req, res, next, 0), new AlterProfileController().handle)

//-- ROTAS CLIENTE
router.post('/client/add', new CreateClientController().handle)
router.delete('/client/remove', (req, res, next) => isAuthenticated(req, res, next, 0), new DeleteClientController().handle)
router.post('/client/alter', (req, res, next) => isAuthenticated(req, res, next, 0), new AlterClientController().handle)

//-- ROTAS SERVIÇOS
router.post('/service/add', new CreateServiceController().handle)
router.delete('/service/remove', (req, res, next) => isAuthenticated(req, res, next, 0), new DeleteServiceController().handle)
router.post('/service/alter', (req, res, next) => isAuthenticated(req, res, next, 0), new AlterServiceController().handle)

//-- ROTAS PRODUTOS

export { router }