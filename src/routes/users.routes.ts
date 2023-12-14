import { Router } from 'express';
import { loginController, registerController } from '~/controllers/users.controller';
import { loginValidation, registerValidation } from '~/middlewares/users.middlewares';

const usersRouter = Router();

usersRouter.post('/register', registerValidation, registerController);
usersRouter.post('/login', loginValidation, loginController);

export default usersRouter;
