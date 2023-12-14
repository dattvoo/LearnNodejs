import express from 'express';
import { ValidationChain, validationResult } from 'express-validator';
import { RunnableValidationChains } from 'express-validator/src/middlewares/schema';
import httpStatus from '~/constants/httpStatus';
import { ErrorWithStatus } from '~/models/Errors';

export const validate = (validations: RunnableValidationChains<ValidationChain>) => {
  return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    await validations.run(req);

    const errors = validationResult(req);

    const errorsObject = errors.mapped();

    for (const key in errorsObject) {
      const { msg } = errorsObject[key];

      if (msg instanceof ErrorWithStatus && msg.status !== httpStatus.UNPROCESSABLE_ENTITY) {
        return next(msg.message);
      }
    }

    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({ errors: errorsObject });
  };
};
