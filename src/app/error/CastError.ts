import mongoose from 'mongoose';
import { TErrorResource } from '../interface/interface';

export const handelCastError = (err: mongoose.Error.CastError) => {
  const errorSource: TErrorResource = [
    {
      path: err.path,
      message: err.message,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: 'CastError',
    errorSource,
  };
};
