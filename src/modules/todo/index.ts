import {asClass} from 'awilix';
import {container} from '../core/config';
import {TodoController} from './controllers';
import {TodoRouter} from './routes';
import {TodoModel} from './models';
import {TodoService} from './services';
import {TodoValidator} from './validators';
import {TodoSocket} from './sockets';

container.register({
  todoRouter: asClass(TodoRouter),
  todoService: asClass(TodoService),
  todoController: asClass(TodoController),
  todoModel: asClass(TodoModel),
  todoValidator: asClass(TodoValidator),
  todoSocket: asClass(TodoSocket),
});

