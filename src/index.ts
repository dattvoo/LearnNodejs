import express, { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';

import databaseService from './services/database.services';
import usersRouter from './routes/users.routes';
import { defaultErrorHandler } from './middlewares/defaultErrors.middlewares';
import dotenv from 'dotenv';

databaseService.connect();

const app = express();
const port = 2808;
// app.use(bodyParser.json());
app.use(express.json());
// Default Errors Handler
app.use(defaultErrorHandler);

app.use('/auth', usersRouter);

app.listen(port, () => {
  console.log(`App is listenning on port:${port}`);
});
