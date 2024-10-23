export class AppError extends Error {
  public statusCode: number;

  constructor(statusCode: number, message: string, stack = '') {
<<<<<<< HEAD
=======
    // eslint-disable-next-line no-unused-expressions
>>>>>>> d451b20c80105bfe0ec156e99cd02742fd04ed34
    super(message), (this.statusCode = statusCode);
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
