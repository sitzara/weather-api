import axios, { AxiosInstance } from 'axios';
import { WeatherData } from '@interfaces/weather.interface';
import { Coordinates, ExternalWeatherData } from './interfaces/weather.interface';
import { ExternalAddressData } from './interfaces/map.interface';
import config from 'config';

export default class Weather {
  private baseUrl: string;
  private apiKey: string;
  private axios: AxiosInstance;

  public constructor() {
    this.baseUrl = config.get('external.weatherServiceUrl') || '';
    this.apiKey = process.env.OPEN_WEATHER_API_KEY || '';
    this.axios = axios.create({
      baseURL: this.baseUrl,
      timeout: 25000,
    });
  }

  private async _get({ lat, lon }: Coordinates): Promise<ExternalWeatherData> {
    const result = await this.axios.get('/data/2.5/weather', { params: { lat, lon, appid: this.apiKey } });
    const data: ExternalWeatherData = result.data;
    return data;
  }

  public async get(address: ExternalAddressData): Promise<WeatherData> {
    const { lat, lon } = address;
    const { name, coord, main } = await this._get({ lat, lon });
    return { name, coord, main };
  }
}
