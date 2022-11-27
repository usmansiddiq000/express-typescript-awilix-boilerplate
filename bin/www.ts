import http from 'http';
import * as dotenv from 'dotenv';
dotenv.config();
import {container} from '../src/modules/core/config';
import fs from 'fs';
import path from 'path';
import {Server as Socketio} from 'socket.io';
import {asValue} from 'awilix';

class Server {
  init = async () => {
    await this.initAllContainerRegisterations();

    // Models must be resolve before all other classes
    await this.resolveModels();

    // Resolve all Registration except models
    await this.resolveOtherRegisterations();

    const app = container.resolve('app');

    app.set('port', process.env.port);
    const server = http.createServer(app);

    const io = new Socketio(server);
    container.register({
      io: asValue(io),
    });

    io.on('connection', (socket) => {
      container.register({
        socket: asValue(socket),
      });

      this.resolveSockets();
    });

    server.listen(process.env.PORT);
    server.on('listening', () => {
      console.log('Express server listening on ' + process.env.PORT);
    });
  };

  initAllContainerRegisterations = async () => {
    const allModules = await fs.promises.readdir(path.join(__dirname, '../src/modules'));
    allModules.forEach(async (modules) => {
      import(path.relative(__dirname, `src/modules/${modules}`));
    });
  };

  resolveModels = async () => {
    const allModels = Object.keys(container.registrations).filter(
        (key) => key.includes('Model')
    );
    allModels.map((model) => container.resolve(model));
  };

  resolveSockets = async () => {
    const allSockets = Object.keys(container.registrations).filter(
        (key) => key.includes('Socket')
    );
    allSockets.map((model) => container.resolve(model));
  };

  resolveOtherRegisterations = async () => {
    const allOtherRegidtrations = Object.keys(container.registrations).filter(
        (key) => !key.includes('Model') && !key.includes('Socket')
    );
    allOtherRegidtrations.map((key) => container.resolve(key));
  };
}


export default new Server().init();
