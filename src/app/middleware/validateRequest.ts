import { Cookie } from './../../../node_modules/undici-types/cookies.d';
import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import catchAsync from '../utils/catchAsync';

export const validateRequest = (schema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    //validation

    await schema.parseAsync({
      body: req.body,
      Cookie: req.cookies,
    });
    next();
  });
};
