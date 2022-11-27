import {asClass} from 'awilix';
import {container} from './config';
import {HomeController} from './controllers';
import {ErrorHandler, ResponseHandler} from './middlewares';
import {HomeRouter} from './routes';
import {HomeSocket} from './sockets';

container.register({
  homeController: asClass(HomeController),
  homeRouter: asClass(HomeRouter),
  errorHandler: asClass(ErrorHandler),
  responseHandler: asClass(ResponseHandler),
  homeSocket: asClass(HomeSocket),
});

