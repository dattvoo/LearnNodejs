import express from 'express';
import bodyParser from 'body-parser';

import databaseService from './services/database.services';
import usersRouter from './routes/users.routes';

const app = express();
const port = 2808;
const a = 1;
app.use(bodyParser.json());

app.get('/', (res, req) => {
  return req.json({
    message: 'Heeeellooooooo'
  });
});

app.use('/auth', usersRouter);

databaseService.connect();
app.listen(port, () => {
  console.log(`App is listenning on port:${port}`);
});
