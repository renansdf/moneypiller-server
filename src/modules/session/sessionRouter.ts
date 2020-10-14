import { Router, Request, Response } from 'express';
import { createSession } from './typeorm/sessionRepository';

const sessionRouter = Router();

sessionRouter.post('/', async (request: Request, response: Response) => {
  const { name, total_value } = request.body;

  const session = await createSession({ name, total_value });

  return response.json(session);
});

export default sessionRouter;