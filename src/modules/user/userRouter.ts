import { Router, Request, Response } from 'express';
import { registerUserData } from '../../socketConnection';
import { createUser } from './typeorm/userRepository';

interface IUserData {
  socket_id: string;
  name: string;
  session_hash: string;
  monthly_cost: number;
  monthly_profit: number;
  balance: number;
}

const userRouter = Router();

userRouter.post('/', async (request: Request, response: Response) => {
  const { socket_id, name, session_hash, monthly_cost, monthly_profit, balance } = request.body;

  // const user = await createUser({ socketId, name, session_hash, monthly_cost, monthly_profit, balance });

  const user: IUserData = { socket_id, name, session_hash, monthly_cost, monthly_profit, balance }

  registerUserData(user);

  return response.json(user);
});

export default userRouter;