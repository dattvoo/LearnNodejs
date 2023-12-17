import express from 'express';
import { ValidationChain, validationResult } from 'express-validator';
import { RunnableValidationChains } from 'express-validator/src/middlewares/schema';
import HTTP_Status from '~/constants/httpStatus';
import { EntityError, ErrorWithStatus } from '~/models/Errors';
import { defaultErrorHandler } from '~/middlewares/defaultErrors.middlewares'; // Import your defaultErrorHandler

export const validate = (validations: RunnableValidationChains<ValidationChain>) => {
  return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);

    const errorsObject = errors.mapped();
    const entityError = new EntityError({ errors: {} });
    for (const key in errorsObject) {
      const { msg } = errorsObject[key];

      if (msg instanceof ErrorWithStatus && msg.status !== HTTP_Status.UNPROCESSABLE_ENTITY) {
        console.log('msg', msg);

        return defaultErrorHandler(msg, req, res, next);
        // return next(msg);
      }
    }

    if (errors.isEmpty()) {
      return next();
    }

    res.status(422).json({ errors: errorsObject });
  };
};
