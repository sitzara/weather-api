import { NextFunction, Request, Response } from 'express';
import { ValidateAddressDto } from '@dtos/address.dto';
import weatherService from '@services/weather.service';

class WeatherController {
  public weatherService = new weatherService();

  public getWeather = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // const address: ValidateAddressDto = req.body;
      const address = req.query as unknown as ValidateAddressDto;
      const data = await this.weatherService.getWeather(address);

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  };

  public validateAddress = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // const address: ValidateAddressDto = req.body;
      const address = req.query as unknown as ValidateAddressDto;
      await this.weatherService.validateAddress(address);

      res.status(200).json({});
    } catch (error) {
      next(error);
    }
  };
}

export default WeatherController;
