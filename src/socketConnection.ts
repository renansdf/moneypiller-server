import { Server } from 'http';
import socketio, { Server as IServer } from 'socket.io';
import { ObjectID } from 'typeorm';

interface IUserData {
  socketId: string;
  id: ObjectID;
  name: string;
  session_hash: string;
  monthly_cost: number;
  monthly_profit: number;
  balance: number;
}

export let socketServer: IServer;
export let connectedUsers: IUserData[] = [];

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
  // ON REGISTER, ADD TO INFO ARRAY
  // AND EMIT TO ALL USERS
  // connectedUsers.push(data);
  // socketServer.emit('updateUsers', connectedUsers);
}