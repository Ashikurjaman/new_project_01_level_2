import express, { Application } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.router';
import { UserRouter } from './app/modules/users/users.router';
const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1/students', StudentRoutes);
app.use('/api/v1/users', UserRouter);

// app.get('/', (req: Request, res: Response) => {
//   console.log('object');
//   res.send('Hello World!');
// });

console.log(process.cwd());

export default app;
