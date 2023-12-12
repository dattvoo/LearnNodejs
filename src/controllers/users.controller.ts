import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { RegisterReqBody } from '~/models/requests/User.requests';
import User from '~/models/schemas/User.schema';
import usersService from '~/services/users.services';

export const registerController = async (
  req: Request<ParamsDictionary, any, RegisterReqBody>,
  res: Response,
) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(404).json({
      message: 'Email or Password not valid',
    });
  }
  try {
    const result = await usersService.register(req.body);

    return res.json({
      message: 'Register success',
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Register failed',
    });
  }
};
