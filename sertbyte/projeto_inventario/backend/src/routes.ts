import { Router, type Request, type Response } from 'express';

import { CreateUserController } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController'
import { DetailuserController } from './controllers/user/DetailUserController'
import { CreateProfileController } from './controllers/profile/CreateProfileController'
import { isAuthenticatedV2 } from './middlewares/isAuthenticatedV2';
import { DeleteProfileController } from './controllers/profile/DeleteProfileController';
import { AlterProfileController } from './controllers/profile/AlterProfileController';
import { ImportStockController } from './controllers/stock/ImportStockController';
import { ImportAddressedStockController } from './controllers/addressed_stock/ImportAddressedStockController';
import { CreateInventController } from './controllers/invent/CreateInventController';
import { AlterInventController } from './controllers/invent/AlterInventControllrer';
import { DeleteInventController } from './controllers/invent/DeleteInventController';
import { ImportProductController } from './controllers/product/ImportProductController';
import { ListProductController } from './controllers/product/ListProductController';
import { DetailProductController } from './controllers/product/DetailProductController';
import { ListStockController } from './controllers/stock/ListStockController';
import { DetailStockController } from './controllers/stock/DetailStockController';
import { DetailAddressedStockController } from './controllers/addressed_stock/DetailAddressedStockController';
import { ListAddressedStockController } from './controllers/addressed_stock/ListAddressedStockController';
import { DetailInventController } from './controllers/invent/DetailInventController';
import { OpenAddressController } from './controllers/invent_address/OpenAddressController';
import { CloseInventAddressController } from './controllers/invent_address/CloseInventAddressController';
import { ImportBranchController } from './controllers/branch/ImportBranchController';
import { ListInventController } from './controllers/invent/ListInventController';
import { ListBranchController } from './controllers/branch/ListBranchConrtoller';
import { ImportAddressController } from './controllers/address/ImportAddressController';
import { ImportMarketingClassController } from './controllers/marketing_class/ImportMarketingClassController';

const router = Router();

//-- ROTAS USER --
router.post('/users', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)
router.get('/me', (req, res, next) => isAuthenticatedV2(req, res, next, 0), new DetailuserController().handle)

//-- ROTAS PROFILE
router.post('/profile/add', new CreateProfileController().handle)
router.delete('/profile/remove', (req, res, next) => isAuthenticatedV2(req, res, next, 0), new DeleteProfileController().handle)
router.post('/profile/alter', (req, res, next) => isAuthenticatedV2(req, res, next, 0), new AlterProfileController().handle)

//-- ROTAS ADDRESS
router.post('/address/import', (req, res, next) => isAuthenticatedV2(req, res, next, 0), new ImportAddressController().handle);

//-- ROTAS BRANCH
router.post('/branch/import', (req, res, next) => isAuthenticatedV2(req, res, next, 0), new ImportBranchController().handle)
/*
o branch/import pode receber como parametro o branch_code e o address, afim de alterar e listar as filiais atualizadas, 
se passar sem parametros ele importa incrementando do Protheus.
*/
router.get('/branch/list',  (req, res, next) => isAuthenticatedV2(req, res, next, 0), new ListBranchController().handle)

//-- ROTAS STOCK
router.post('/stock/import', (req, res, next) => isAuthenticatedV2(req, res, next, 0), new ImportStockController().handle)
router.get('/stock/list', (req, res, next) => isAuthenticatedV2(req, res, next, 0), new ListStockController().handle)
/*
No list realizar as rotinas de verificação: Custo zerado e reserva. Criar uma tela que mostre isso após as importações, o mesmo é impeditivo para
iniciar o inventário.
*/
router.get('/stock/detail', (req, res, next) => isAuthenticatedV2(req, res, next, 0), new DetailStockController().handle)

//-- ROTAS MARKETING CLASS
router.post('/marketing_class/import', (req, res, next) => isAuthenticatedV2(req, res, next, 0),new ImportMarketingClassController().handle)

//-- ROTAS ADDRESSED STOCK
router.post('/addressed_stock/import', (req, res, next) => isAuthenticatedV2(req, res, next, 0), new ImportAddressedStockController().handle)
router.get('/addressed_stock/detail', (req, res, next) => isAuthenticatedV2(req, res, next, 0), new DetailAddressedStockController().handle)
router.get('/addressed_stock/list', (req, res, next) => isAuthenticatedV2(req, res, next, 0), new ListAddressedStockController().handle)
/*
No list realizar as rotinas de verificação: Movimentação WMS e Desbalanceamento. Criar uma tela que mostre isso após as importações, o mesmo é impeditivo para
iniciar o inventário.
*/
router.post('/addressed_stock/open', (req, res, next) => isAuthenticatedV2(req, res, next, 0), new OpenAddressController().handle)
router.post('/addressed_stock/close', (req, res, next) => isAuthenticatedV2(req, res, next, 0), new CloseInventAddressController().handle)

//-- ROTAS INVENT
router.post('/invent/add', (req, res, next) => isAuthenticatedV2(req, res, next, 0), new CreateInventController().handle)
router.post('/invent/alter', (req, res, next) => isAuthenticatedV2(req, res, next, 0), new AlterInventController().handle)
router.post('invent/list', (req, res, next) => isAuthenticatedV2(req, res, next, 0), new ListInventController().handle)
router.delete('/invent/delete', (req, res, next) => isAuthenticatedV2(req, res, next, 0), new DeleteInventController().handle)
router.get('/invent/detail', (req, res, next) => isAuthenticatedV2(req, res, next, 0), new DetailInventController().handle)
//criar uma listagem de inventários e validar o armazém, criar status, no list apresentar o documento

//-- ROTAS PRODUTO
router.post('/product/import', (req, res, next) => isAuthenticatedV2(req, res, next, 0), new ImportProductController().handle)
router.get('/product/list', (req, res, next) => isAuthenticatedV2(req, res, next, 0), new ListProductController().handle)
router.get('/product/detail', (req, res, next) => isAuthenticatedV2(req, res, next, 0), new DetailProductController().handle)

//-- ROTAS COUNT


export { router }; 