import { TodoService } from "../services";


export class TodoController {
    todoService: TodoService;
    constructor({todoService}){
        this.todoService = todoService
    }

    create = async (req, res) => {
        try {
            const todo = this.todoService.create(req.body);
            res.status(200).jsonp(todo)
        } catch (e) {
            res.status(500).jsonp({message: e.message})
        }
    };

    getAll = async (req, res) => {
        try {
          const todos = await this.todoService.getAll()
          res.status(200).jsonp(todos)
        } catch (e) {
            res.status(500).jsonp({message: e.message})
        }
      };
}

  