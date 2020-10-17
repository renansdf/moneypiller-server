import { Server } from 'http';
import socketio, { Server as IServer } from 'socket.io';
import { ObjectID } from 'typeorm';

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

interface IUserProposalData {
  from: string;
  socket_id: string;
  user_proposals: IProposal[];
}

export let socketServer: IServer;
export let connectedUsers: IUserData[] = [];
export let allProposals: IUserProposalData[] = [];

export function connectToSocketServer(server: Server) {
  socketServer = socketio(server);

  socketServer.on('connection', socket => {
    const { session_hash } = socket.handshake.query;

    socket.emit('userConnection', 'a user connecteds');


    // ON DISCONECT, DELETE USER FROM 
    // USING THE SOCKET ID

    // socket.on('disconnect', () => {
    //   socket.id;
    //   delete connectedUsers[socket.id];
    // });
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