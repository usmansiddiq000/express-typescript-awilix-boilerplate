import {ErrorHandler, ResponseHandler} from '../../core/middlewares';
import {TodoService} from '../services';
import * as _ from 'lodash';

export class TodoController {
  todoService: TodoService;
  errorHandler: ErrorHandler;
  responseHandler: ResponseHandler;
  whitelistedFields = ['name', 'description'];
  constructor({todoService, errorHandler, responseHandler}) {
    this.todoService = todoService;
    this.errorHandler = errorHandler;
    this.responseHandler = responseHandler;
  }

  /**
 * @swagger
 *  /api/todo:
 *    post:
 *      tags:
 *        - Todo
 *      security:
 *        []
 *      summary: create todo.
 *      description: create todo.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  description: name of todo
 *                  example: abc
 *                description:
 *                  type: string
 *                  description: description of todo
 *                  example: this is todo
 *      responses:
 *        200:
 *          description: create Todo.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Todo'
 */

  create = async (req, res) => {
    try {
      const todo = await this.todoService.create(req.body);
      this.responseHandler.handle200(res, {todo});
    } catch (e) {
      return this.errorHandler.handle500(res, e.message);
    }
  };


  /**
 * @swagger
 *  /api/todo/{todoId}:
 *    put:
 *      tags:
 *        - Todo
 *      security:
 *        []
 *      summary: update todo.
 *      description: update todo.
 *      parameters:
 *        - in: path
 *          name: todoId
 *          schema:
 *            type: string
 *            required: true
 *            description: The todo id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Todo'
 *      responses:
 *        200:
 *          description: User signin.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Todo'
 */

  update = async (req, res) => {
    try {
      let todo = req.todo;
      todo = _.extend(todo, _.pick(req.body, this.whitelistedFields));
      await todo.save();
      this.responseHandler.handle200(res, {todo});
    } catch (e) {
      return this.errorHandler.handle500(res, e.message);
    }
  };


  /**
   * @swagger
   *  /api/todo/{todoId}:
   *    get:
   *      tags:
   *        - Todo
   *      security:
   *        []
   *      summary: Get todo by id.
   *      description: Get todo by id.
   *      parameters:
   *        - in: path
   *          name: todoId
   *          schema:
   *            type: string
   *            required: true
   *            description: The todo id
   *      responses:
   *        200:
   *          description: User signin.
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Todo'
   */


  getById = async (req, res) => {
    try {
      const todo = req.todo;
      this.responseHandler.handle200(res, {todo});
    } catch (e) {
      return this.errorHandler.handle500(res, e.message);
    }
  };

  /**
   * @swagger
   *  /api/todo/{todoId}:
   *    delete:
   *      tags:
   *        - Todo
   *      security:
   *        []
   *      summary: Delete todo by id.
   *      description: Delete todo by id.
   *      parameters:
   *        - in: path
   *          name: todoId
   *          schema:
   *            type: string
   *            required: true
   *            description: The todo id
   *      responses:
   *        200:
   *          description: User signin.
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  success:
   *                    type: string
   *                    description: sucess true
   *                    example: true
   */


  removeById = async (req, res) => {
    try {
      const todo = req.todo;
      todo.isDeleted = true;
      await todo.save();
      this.responseHandler.handle200(res, {success: true});
    } catch (e) {
      return this.errorHandler.handle500(res, e.message);
    }
  };

  /**
 * @swagger
 *  /api/todo:
 *    get:
 *      tags:
 *        - Todo
 *      security:
 *        []
 *      summary: Get all  todo.
 *      description: Get all todo.
 *      responses:
 *        200:
 *          description: Get all Todos.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Todos'
 */

  getAll = async (req, res) => {
    try {
      const todos = await this.todoService.getAll();
      this.responseHandler.handle200(res, {todos});
    } catch (e) {
      return this.errorHandler.handle500(res, e.message);
    }
  };


  /**
   * Todo middlewarre
   */
  todoById = async (req, res, next, id) => {
    try {
      const todo = await this.todoService.findById(id);
      if (!todo) return this.errorHandler.handle404(res);
      req.todo = todo;
      next();
    } catch (e) {
      return this.errorHandler.handle500(res, e.message);
    }
  };
}
/**
 * @swagger
 *  components:
 *    schemas:
 *      Todos:
 *        type: object
 *        properties:
 *          status:
 *            type: boolean
 *            description: response status
 *            example: true
 *          data:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/TodoScheme'
 *      Todo:
 *        type: object
 *        properties:
 *          status:
 *            type: boolean
 *            description: response status
 *            example: true
 *          data:
 *            type: object
 *            $ref: '#/components/schemas/TodoScheme'
 *      TodoScheme:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *            description: id
 *            example: 637dbd600eaacca6b207e7d3
 *          name:
 *            type: string
 *            description: name of todo
 *            example: abc
 *          description:
 *            type: string
 *            description:  description of todo
 *            example: this is todo
*/


