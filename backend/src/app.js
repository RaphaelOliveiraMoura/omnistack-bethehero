import express from 'express';
import cors from 'cors';
import { errors } from 'celebrate';

import routes from './routes';

class Application {
  constructor() {
    this.app = express();

    this.middlewares();
    this.routes();
    this.handleErrors();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use(routes);
  }

  handleErrors() {
    this.app.use(errors());
  }
}

export default new Application().app;
