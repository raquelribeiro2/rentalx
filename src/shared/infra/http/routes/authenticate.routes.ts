import { Router } from 'express';

import { AuthenticateUserController } from '@modules/accounts/useCases/authenticateUser/AuthenticateUserController';
import { RefreshTokenController } from '@modules/accounts/useCases/refreshToken/RefreshTokenController';

const authenticateUsersRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

authenticateUsersRoutes.post('/sessions', authenticateUserController.handle);
authenticateUsersRoutes.post('/refresh-token', refreshTokenController.handle);

export { authenticateUsersRoutes };
