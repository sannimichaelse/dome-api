import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import routes from './routes';
import Connection from './config/database';
import envConfig from './config/index';
import {
  appErrorHandler,
  genericErrorHandler,
  notFound
} from './middlewares/error.middleware';
import logger, { logStream } from './config/logger';

import morgan from 'morgan';

const app = express();
const host = envConfig.APP_HOST;
const port = envConfig.APP_PORT;
const api_version = envConfig.API_VERSION;

app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('combined', { stream: logStream }));

const connection = new Connection();
connection.setup();

app.use(`/api/${api_version}`, routes());
app.use(appErrorHandler);
app.use(genericErrorHandler);
app.use(notFound);

app.listen(port, () => {
  logger.info(`Server started at ${host}:${port}/api/${api_version}/`);
});

export default app;
