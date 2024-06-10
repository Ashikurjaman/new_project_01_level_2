import express, { Application } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.router';
import { UserRouter } from './app/modules/users/users.router';
import { globalErrorHandler } from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';
import router from './app/Routes/Index';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1/', router);

//not found route
app.use(notFound);
//global error handler route
app.use(globalErrorHandler);

console.log(process.cwd());
export default app;
