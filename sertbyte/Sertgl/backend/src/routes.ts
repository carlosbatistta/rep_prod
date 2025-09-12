import { Router, type Request, type Response } from 'express';
import { isAuthenticated } from './middlewares/isAuthenticated.js';
import { CreateUserController } from './controller/user/CreateUserController.js'
import { AuthUserController } from './controller/user/AuthUserController.js'
import { DetailuserController } from './controller/user/DetailUserController.js'
import { AlterUserController } from './controller/user/AlterUserController.js';
import { DeleteUserController } from './controller/user/DeleteUserController.js';
import { CreateProfileController } from './controller/profile/CreateProfileController.js'
import { DeleteProfileController } from './controller/profile/DeleteProfileController.js';
import { AlterProfileController } from './controller/profile/AlterProfileController.js';
import { CreateClientController } from './controller/client/CreateClientController.js';
import { DeleteClientController } from './controller/client/DeleteClientController.js';
import { AlterClientController } from './controller/client/AlterClientController.js';
import { CreateServiceController } from './controller/service/CreateServiceController.js';
import { DeleteServiceController } from './controller/service/DeleteServiceController.js';
import { AlterServiceController } from './controller/service/AlterServiceController.js';
import { CreateLicenseController } from './controller/license/CreateLicenseController.js';
import { DeleteLicenseController } from './controller/license/DeleteLicenseController.js';
import { AlterLicenseController } from './controller/license/AlterLicenseController.js';

const router = Router()


//-- ROTAS USER --
router.post('/users', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)
router.get('/me', (req, res, next) => isAuthenticated(req, res, next, 0), new DetailuserController().handle)
router.post('/users/alter', (req, res, next) => isAuthenticated(req, res, next, 0), new AlterUserController().handle)
router.delete('/users/remove', (req, res, next) => isAuthenticated(req, res, next, 0), new DeleteUserController().handle)

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

//-- ROTAS LICENSE
router.post('/license/add', (req, res, next) => isAuthenticated(req, res, next, 0), new CreateLicenseController().handle)
router.delete('/license/remove', (req, res, next) => isAuthenticated(req, res, next, 0), new DeleteLicenseController().handle)
router.post('/license/alter', (req, res, next) => isAuthenticated(req, res, next, 0), new AlterLicenseController().handle)

export { router }