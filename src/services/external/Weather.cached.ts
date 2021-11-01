import { WeatherData } from '@interfaces/weather.interface';
import OpenWeatherMap from './OpenWeatherMap';
import { ExternalAddressData } from './interfaces/map.interface';
import weatherModel from '@models/weather.model';

class Weather {
  private weather = weatherModel;
  private weatherService: OpenWeatherMap;

  constructor() {
    this.weatherService = new OpenWeatherMap();
  }

  public async get(address: ExternalAddressData): Promise<WeatherData> {
    const cacheKey = this.getCacheKey(address);
    const cachedData: WeatherData = await this.weather.findOne({ key: cacheKey });

    if (cachedData) {
      return this.formatData(cachedData);
    }

    const data = await this.weatherService.get(address);
    await this.weather.create({ ...data, key: cacheKey });

    return this.formatData(data);
  }

  public formatData({ name, coord, main }: WeatherData): WeatherData {
    return { name, coord, main };
  }

  public getCacheKey(address: ExternalAddressData): string {
    const { lon, lat } = address;
    return `${lon}+${lat}`;
  }
}

export default Weather;
