import {Mongoose} from 'mongoose';
import {ITodo} from '../interfaces';

export class TodoService {
  moongose: Mongoose;
  todoCollection;
  constructor({mongoose}) {
    this.moongose = mongoose;
    this.todoCollection = this.moongose.model('Todo');
  }

  create = async (data: ITodo): Promise<ITodo> => {
    // eslint-disable-next-line new-cap
    const todo = new this.todoCollection({...data, isDeleted: false});
    return await todo.save();
  };

  getAll = async (): Promise<ITodo> => {
    return await this.todoCollection.find({isDeleted: false});
  };

  findByName = async (name: string): Promise<ITodo> => {
    return await this.todoCollection.find({isDeleted: false, name: name});
  };
}
