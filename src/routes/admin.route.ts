import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';

class AdminRoute implements Routes {
  public path = '/admin';
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

export default AdminRoute;
