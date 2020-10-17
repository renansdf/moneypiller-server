import { Router, Request, Response } from 'express';
import { updateProposals } from '../../socketConnection';

interface IProposal {
  name: string;
  value: number;
}

interface IUserProposalData {
  from: string;
  socket_id: string;
  user_proposals: IProposal[];
}

const proposalRouter = Router();

proposalRouter.post('/', async (request: Request, response: Response) => {
  const { from, socket_id, user_proposals } = request.body;

  const userProposal: IUserProposalData = { socket_id, from, user_proposals }

  updateProposals(userProposal);

  return response.json(userProposal);
});

export default proposalRouter;