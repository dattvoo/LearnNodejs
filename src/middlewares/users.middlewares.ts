import { NextFunction, Request, Response } from 'express';
import { checkSchema } from 'express-validator';
import { validate } from '~/utils/validation';

export const registerValidation = validate(
  checkSchema({
    name: {
      isLength: {
        options: {
          min: 1,
          max: 100,
        },
      },
      notEmpty: true,
      trim: true,
      isString: true,
    },
    email: {
      isEmail: true,
      notEmpty: true,
      trim: true,
    },
    password: {
      notEmpty: true,
      isLength: {
        options: { min: 6, max: 25 },
      },
      isString: true,
      isStrongPassword: {
        options: {
          minLength: 6,
          minSymbols: 1,
          minUppercase: 1,
        },
        errorMessage: 'Password is not strong!',
      },
    },
    confirm_password: {
      notEmpty: true,
      isLength: {
        options: { min: 6, max: 25 },
      },
      isString: true,
      isStrongPassword: {
        options: {
          minLength: 6,
          minSymbols: 1,
          minNumbers: 1,
          minUppercase: 1,
        },
        errorMessage: 'Password is not strong!',
      },
      custom: {
        options: (value, { req }) => {
          if (value !== req.body.password) {
            throw new Error('Password confirm is does not match password!');
          }
          return true;
        },
      },
    },
    date_of_birth: {
      isISO8601: {
        options: {
          strict: true,
          strictSeparator: true,
        },
      },
    },
  }),
);
