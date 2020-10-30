import 'reflect-metadata';
import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import http from 'http';
import { connectToSocketServer } from './socketConnection';

import sessionRouter from './modules/session/sessionRouter';
import userRouter from './modules/user/userRouter';
import proposalRouter from './modules/proposal/proposalRouter';
import pileRouter from './modules/pile/pileRouter';

import './connection';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/session', sessionRouter);
app.use('/user', userRouter);
app.use('/proposal', proposalRouter);
app.use('/pile', pileRouter);

const server = http.createServer(app);
connectToSocketServer(server);

server.listen(3333, () => {
  console.log('server started on port 3333');
});