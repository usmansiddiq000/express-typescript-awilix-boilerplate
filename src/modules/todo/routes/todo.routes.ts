import express from 'express';
import {ErrorHandler} from '../../core/middlewares';
import {TodoController} from '../controllers/todo.controller';
import {TodoValidator} from '../validators';

export class TodoRouter {
  public app: express.Application;
  public todoController: TodoController;
  public todoValidator: TodoValidator;
  public errorHandler: ErrorHandler;

  constructor({app, todoController, todoValidator, errorHandler}) {
    this.todoController = todoController;
    this.todoValidator = todoValidator;
    this.app = app;
    this.init();
  }

  init = async () => {
    this.app.route('/api/todo')
        .post(
            this.todoValidator.validationTodoSchema('create'),
            this.errorHandler.validatorErrorHandler,
            this.todoController.create
        )
        .get(this.todoController.getAll);
  };
}

