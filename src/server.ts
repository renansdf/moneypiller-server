import 'reflect-metadata';
import 'express-async-errors';
import express from 'express';
import sessionRouter from './modules/session/sessionRouter';

import './connection';

const app = express();

app.use(express.json());

app.use('/session', sessionRouter);

app.listen(3333, () => {
  console.log('server started on port 3333');
});