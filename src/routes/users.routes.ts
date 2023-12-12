import { Router } from 'express';
import { registerController } from '~/controllers/users.controller';
import { registerValidation } from '~/middlewares/users.middlewares';

const usersRouter = Router();

usersRouter.post('/register', registerValidation, registerController);

export default usersRouter;
