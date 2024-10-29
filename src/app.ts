import express, { Application } from 'express';
import cors from 'cors';
import { globalErrorHandler } from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';
import router from './app/Routes/Index';
import cookieParser from 'cookie-parser';

const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: [] }));

app.use('/api/v1/', router);

//not found route
app.use(notFound);
//global error handler route
app.use(globalErrorHandler);

export default app;
