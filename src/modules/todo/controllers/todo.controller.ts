import {ErrorHandler, ResponseHandler} from '../../core/middlewares';
import {TodoService} from '../services';


export class TodoController {
  todoService: TodoService;
  errorHandler: ErrorHandler;
  responseHandler: ResponseHandler;
  constructor({todoService, errorHandler, responseHandler}) {
    this.todoService = todoService;
    this.errorHandler = errorHandler;
    this.responseHandler = responseHandler;
  }

  create = async (req, res) => {
    try {
      const todo = this.todoService.create(req.body);
      this.responseHandler.handle200(res, {todo});
    } catch (e) {
      return this.errorHandler.handle500(res, e.message);
    }
  };

  getAll = async (req, res) => {
    try {
      const todos = await this.todoService.getAll();
      this.responseHandler.handle200(res, {todos});
    } catch (e) {
      return this.errorHandler.handle500(res, e.message);
    }
  };
}

