import { Router, Request, Response } from 'express';
import { registerUserData } from '../../socketConnection';
import { createUser } from './typeorm/userRepository';

const userRouter = Router();

userRouter.post('/', async (request: Request, response: Response) => {
  const { socketId, name, session_hash, monthly_cost, monthly_profit, balance } = request.body;

  const user = await createUser({ socketId, name, session_hash, monthly_cost, monthly_profit, balance });

  registerUserData(user);

  return response.json(user);
});

export default userRouter;