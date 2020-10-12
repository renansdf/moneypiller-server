import { Router, Request, Response } from 'express';
import { uuid } from 'uuidv4';
import { createSession } from './typeorm/sessionRepository';

const sessionRouter = Router();

sessionRouter.post('/', async (request: Request, response: Response) => {
  const { name, totalValue } = request.body;

  const hash = uuid();
  const session = await createSession({ name, totalValue, hash });

  return response.json(session);
});

export default sessionRouter;