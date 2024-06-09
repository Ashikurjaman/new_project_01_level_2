import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.router';
import { UserRouter } from './app/modules/users/users.router';
import { globalErrorHandler } from './app/middleware/globalErrorHandler';
const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1/students', StudentRoutes);
app.use('/api/v1/users', UserRouter);

// app.get('/', (req: Request, res: Response) => {
//   console.log('object');
//   res.send('Hello World!');
// });

app.use(globalErrorHandler);
app.use();
console.log(process.cwd());
export default app;
