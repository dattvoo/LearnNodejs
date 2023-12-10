import { Request, Response } from 'express';
import User from '~/models/schemas/User.schema';
import databaseService from '~/services/database.services';
import usersService from '~/services/users.services';

export const registerController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(404).json({
      message: 'Email or Password not valid',
    });
  }
  try {
    const result = await usersService.register(new User({ email, password }));
    console.log('result ', result);

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
