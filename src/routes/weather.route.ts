import { Router } from 'express';
import WeatherController from '@controllers/weather.controller';
import { ValidateAddressDto } from '@dtos/address.dto';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';

class WeatherRoute implements Routes {
  public path = '/weather';
  public router = Router();
  public weatherController = new WeatherController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    
    this.router.get(`${this.path}`, authMiddleware, validationMiddleware(ValidateAddressDto, 'query'), this.weatherController.getWeather);
    this.router.get(`${this.path}/address/validate`, validationMiddleware(ValidateAddressDto, 'query'), this.weatherController.validateAddress);
  }
}

export default WeatherRoute;
