import {Server, Socket} from 'socket.io';

export class HomeSocket {
  io: Server;
  socket: Socket;
  constructor({io, socket}) {
    this.socket = socket;
    this.io = io;
    this.init();
  }

  init = () => {
    this.socket.on('home', (data, callback) => {
      console.log(this.socket.id);
      callback(`${data} ${this.socket.id}`);
    });
  };
}
