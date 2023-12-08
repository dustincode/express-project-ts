import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';

import * as errorMiddleware from './middlewares/error.middleware';
import morganMiddleware from './middlewares/morgan.middleware';
import mainRoutes from './routes';

dotenv.config();

const app = express();

app.use(morganMiddleware);
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('', mainRoutes);

app.use(errorMiddleware.notFound);
app.use(errorMiddleware.errorHandler);

export default app;
