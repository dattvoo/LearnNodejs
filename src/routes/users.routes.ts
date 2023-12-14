import { Router } from 'express';
import { loginController, registerController } from '~/controllers/users.controller';
import { loginValidation, registerValidation } from '~/middlewares/users.middlewares';
import { wrapRequestHandler } from '~/utils/handlerErrors';

const usersRouter = Router();
// if router match register it will jumb to wrapRequestHandler
usersRouter.post('/register', registerValidation, wrapRequestHandler(registerController));
usersRouter.post('/login', loginValidation, loginController);

export default usersRouter;
