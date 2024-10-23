import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      userData?: JwtPayload | string; // Adjust type if needed
    }
  }
}
