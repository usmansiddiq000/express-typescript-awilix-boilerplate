import {Mongoose} from 'mongoose';
import {ITodo} from '../interfaces';

export class TodoService {
  mongoose: Mongoose;
  todoCollection;
  constructor({mongoose}) {
    this.mongoose = mongoose;
    this.todoCollection = this.mongoose.model('Todo');
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
    return await this.todoCollection.findOne({isDeleted: false, name: name});
  };

  findById = async (id: string): Promise<ITodo> => {
    return await this.todoCollection.findOne(
        {isDeleted: false, _id: new this.mongoose.Types.ObjectId(id)}
    );
  };
}
