import { Router } from 'express';

import { AuthenticateUserController } from '../modules/accounts/useCases/authenticateUser/AuthenticateUserController';

const authenticateUsersRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

authenticateUsersRoutes.post('/', authenticateUserController.handle);

export { authenticateUsersRoutes };
