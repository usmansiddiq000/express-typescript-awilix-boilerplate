import {Mongoose} from 'mongoose';
import {ITodo} from '../interfaces';

export class TodoModel {
  public mongoose: Mongoose;
  constructor({mongoose}) {
    this.mongoose = mongoose;
    this.init();
  }

  validateLocalStrategyProperty = (property) => {
    return property.length;
  };

  init = () => {
    const Schema = this.mongoose.Schema;
    /**
         * Todo Schema
         */
    const TodoSchema = new Schema<ITodo>(
        {
          name: {
            type: String,
            trim: true,
            required: true,
            validate: [
              this.validateLocalStrategyProperty,
              'Please fill in todo name',
            ],
          },
          description: {
            type: String,
            trim: true,
            required: true,
            validate: [
              this.validateLocalStrategyProperty,
              'Please fill in todo description',
            ],
          },
          isDeleted: {
            type: Boolean,
            defaults: false,
          },
        },
        {
          timestamps: true,
        },
    );
    this.mongoose.model('Todo', TodoSchema);
  };
}
