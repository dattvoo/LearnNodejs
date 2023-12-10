import { Router } from 'express';
import { registerController } from '~/controllers/users.controller';

const usersRouter = Router();

usersRouter.post('/register', registerController);

export default usersRouter;
