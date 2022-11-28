import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerDefinition from './swagger-definition';
import path from 'path';
import cors from 'cors';

const swaggerOptions = {
  swaggerDefinition,
  apis: ['./src/modules/*/controllers/**/*.ts'],
};
const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default class ExpressApp {
  public app: express.Application;
  public mongoose;
  constructor({app, mongoose}) {
    this.app = app;
    this.mongoose = mongoose;
    this.initApp();
    this.initDb();
  }

  initApp = async () => {
    try {
      this.app.use(cors());
      this.app.use(express.json());
      this.app.use(compression());
      this.app.use(helmet({contentSecurityPolicy: false}));
      this.app.use(express.urlencoded({extended: false}));
      this.app.use('/public', express.static(path.join(__dirname, 'public')));
      this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    } catch (err) {
      console.log(err.message);
    }
  };

  initDb = async () => {
    try {
      await this.mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Mongodb connected successfully');
    } catch (err) {
      console.log(err.message);
    }
  };
}
