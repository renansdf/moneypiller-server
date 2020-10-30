import { Router, Request, Response } from 'express';
import { addValidatorToProposal, updateProposals } from '../../socketConnection';

interface IProposal {
  name: string;
  value: number;
}

interface IUsersValidated {
  validator_name: string;
  validator_socket_id: string;
}
interface IUserProposalData {
  from: string;
  socket_id: string;
  user_proposals: IProposal[];
  users_validated: IUsersValidated[];
}

const proposalRouter = Router();

proposalRouter.post('/', async (request: Request, response: Response) => {
  const { from, socket_id, user_proposals, users_validated } = request.body;

  const userProposal: IUserProposalData = { socket_id, from, user_proposals, users_validated }

  updateProposals(userProposal);

  return response.json(userProposal);
});

proposalRouter.put('/', async (request: Request, response: Response) => {
  const { proposal_socket_id, add_name, add_socket_id } = request.body;

  addValidatorToProposal({
    validator_name: add_name,
    validator_socket_id: add_socket_id
  }, proposal_socket_id);

  return response.json({ add_name, add_socket_id, proposal_socket_id });
});

export default proposalRouter;