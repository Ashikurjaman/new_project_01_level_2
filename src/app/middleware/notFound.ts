import { Request, Response } from 'express';
import status from 'http-status';

const notFound = (
  err: any,
  req: Request,
  res: Response,
  next: NewableFunction,
) => {
  return res.status(status.NOT_FOUND).json({
    success: false,
    message: 'Api Not Found',
    error: '',
  });
};
