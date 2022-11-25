import { Mongoose } from "mongoose";

export class TodoService {
    moongose: Mongoose;
    todoCollection;
    constructor({mongoose}){
        this.moongose = mongoose;
        this.todoCollection = this.moongose.model('Todo');
    }

    create = async (data) => {
        const todo = new this.todoCollection({ ...data, isDeleted: false});
        return await todo.save();
    };

    getAll = async () => {
        return await this.todoCollection.find({isDeleted: false});
    };
}