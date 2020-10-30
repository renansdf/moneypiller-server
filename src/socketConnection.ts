import { Server } from 'http';
import socketio, { Server as IServer } from 'socket.io';

interface IUserData {
  socket_id: string;
  name: string;
  session_hash: string;
  monthly_cost: number;
  monthly_profit: number;
  balance: number;
}

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

export let socketServer: IServer;
export let connectedUsers: IUserData[] = [];
export let allProposals: IUserProposalData[] = [];
export let pileValue: number = 0;

export function connectToSocketServer(server: Server) {
  socketServer = socketio(server);

  socketServer.on('connection', socket => {
    const { session_hash } = socket.handshake.query;

    socket.emit('userConnection', 'a user connecteds');

    socket.emit('updateUsers', connectedUsers);

    socket.emit('updateProposals', allProposals);

    socket.emit('updatePileValue', pileValue)

    socket.on('disconnect', () => {
      socket.id;
      connectedUsers = connectedUsers.filter(user => user.socket_id !== socket.id);

      allProposals = allProposals.filter(proposal => proposal.socket_id !== socket.id);

      socketServer.emit('updateUsers', connectedUsers);
      socketServer.emit('updateProposals', allProposals);
    });
  });

}

export function registerUserData(data: IUserData) {
  const filteredUsers = connectedUsers.filter(user => user.socket_id !== data.socket_id);

  filteredUsers.push(data);
  connectedUsers = filteredUsers;
  socketServer.emit('updateUsers', connectedUsers);
}

export function updateProposals(data: IUserProposalData) {
  const filteredProposals = allProposals.filter(proposal => proposal.socket_id !== data.socket_id);
  filteredProposals.push(data);

  allProposals = filteredProposals;
  socketServer.emit('updateProposals', allProposals);
}

export function addValidatorToProposal(newUser: IUsersValidated, proposal_socket_id: string) {
  const updatedProposals = allProposals.map(proposal => {
    if (proposal.socket_id === proposal_socket_id) {
      let updatedUserList = proposal.users_validated.filter(user => {
        return user.validator_socket_id !== newUser.validator_socket_id
      });
      updatedUserList.push(newUser);
      proposal.users_validated = updatedUserList;
    }
    return proposal;
  });

  allProposals = updatedProposals;
  socketServer.emit('updateProposals', allProposals);
}

export function updatePile(newPileValue: number) {
  pileValue = newPileValue;
  socketServer.emit('updatePileValue', pileValue);
}