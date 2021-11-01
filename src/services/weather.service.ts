import { WeatherData, Address } from '@interfaces/weather.interface';
import Map from './external/Map.cached';
import Weather from './external/Weather.cached';

class WeatherService {
  public async getWeather(address: Address): Promise<WeatherData> {
    const addressData = await new Map().getAddressData(address);
    const data = await new Weather().get(addressData);
    return data;
  }

  public async validateAddress(address: Address): Promise<void> {
    await new Map().getAddressData(address);
  }
}

export default WeatherService;
