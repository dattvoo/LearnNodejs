import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { RegisterReqBody } from '~/models/requests/User.requests';
import databaseService from '~/services/database.services';
import usersService from '~/services/users.services';
import { verifyPassword } from '~/utils/crypto';

export const registerController = async (req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(404).json({
      message: 'Email or Password not valid'
    });
  }
  const result = await usersService.register(req.body);
  return res.json({
    message: 'Register success',
    data: result
  });
};
export const loginController = async (
  req: Request<ParamsDictionary, any, { email: string; password: string }>,
  res: Response
) => {
  const { email, password } = req.body;
  try {
    const user = await databaseService.users.findOne({ email: email });

    if (!user) {
      return res.json({
        message: 'Email is not valid'
      });
    }
    const checkPassword = verifyPassword(password, user.password);

    if (checkPassword) {
      return res.json({
        message: 'Login Success!'
      });
    }
    return res.json({ message: 'Email or password is not valid!' });
  } catch (error) {
    return res.status(404).json({
      message: 'Login failed'
    });
  }
};
