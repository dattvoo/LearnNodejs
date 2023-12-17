import { NextFunction, Request, Response } from 'express';
import HTTP_Status from '~/constants/httpStatus';
export const defaultErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.log('Errors status:', err.status);
  console.log('Errrors Message', err.message);

  return res.status(err.status || HTTP_Status.INTERNAL_SERVER_ERROR).json(err.message);
};
