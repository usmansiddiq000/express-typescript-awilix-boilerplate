import express from 'express';
import {HomeController} from '../controllers';


export class HomeRouter {
  public app: express.Application;
  public homeController: HomeController;
  constructor({app, homeController}) {
    this.homeController = homeController;
    this.app = app;
    this.init();
  }

  init = async () => {
    this.app.route('/').get(this.homeController.get);
  };
}

