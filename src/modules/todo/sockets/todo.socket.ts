import {Server, Socket} from 'socket.io';

export class TodoSocket {
  io: Server;
  socket: Socket;
  constructor({io, socket}) {
    this.socket = socket;
    this.io = io;
    this.init();
  }

  init = () => {
    this.socket.on('message', (data) => {
      console.log(this.socket.id);
      this.socket.emit('something');
    });
  };
}
