import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';

class ApiRoute implements Routes {
  public path = '/api/v1';
  public router = Router();
  public subroutes: Routes[];

  constructor(subroutes: Routes[] = []) {
    this.subroutes = subroutes;
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.subroutes.forEach(route => {
      this.router.use(`${this.path}`, route.router);
    });
  }
}

export default ApiRoute;
