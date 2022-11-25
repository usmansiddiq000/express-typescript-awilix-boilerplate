import { TodoService } from "../services";
import { body } from 'express-validator';

export class TodoValidator {
    todoService: TodoService;

    constructor({todoService}){
        this.todoService = todoService;
    }

    validationTodoSchema = (method) => {
        switch (method) {
          case 'create': {
            return [
              body('name')
                  .exists({checkFalsy: true})
                  .withMessage('name is required')
                  .bail()
                  .custom(async (value) => {
                    const todo = await this.todoService.findByName(value);
                    if (todo) {
                      return Promise.reject(new Error('todo already exists'));
                    }
                  })
                  .isLength({max: 25})
                  .withMessage('name max length should be 25 characters')
                  .trim(),
              body('description')
                  .exists({checkFalsy: true})
                  .withMessage('description is required')
                  .bail()
                  .isLength({max: 25})
                  .withMessage('description max length should be 25 characters')
                  .trim(),
            ];
          }
        }
    };
}