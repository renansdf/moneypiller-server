import { Router, Request, Response } from 'express';
import { updatePile } from '../../socketConnection';

const pileRouter = Router();

pileRouter.post('/', async (request: Request, response: Response) => {
  const { pileValue } = request.body;

  updatePile(pileValue);

  return response.json(pileValue);
});

export default pileRouter;