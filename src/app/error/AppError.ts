export class AppError extends Error {
  public statusCode: number;

  constructor(statusCode: number, message: string, stack = '') {
    // eslint-disable-next-line no-unused-expressions
    super(message), (this.statusCode = statusCode);
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
