import express from 'express'
import { TodoController } from '../controllers/todo.controller';

export class TodoRouter {
    public app: express.Application;
    public todoController: TodoController;
    
    constructor({app, todoController}) {
        this.todoController = todoController;
        this.app = app;
        this.init();
    }

    init = async() => {
        this.app.route('/api/todo')
            .post(this.todoController.create)
            .get(this.todoController.getAll);
    }
}

  