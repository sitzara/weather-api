import { Address } from '@interfaces/weather.interface';
import addressModel from '@models/address.model';
import OpenStreetMap from './OpenStreetMap';
import { ExternalAddressData } from './interfaces/map.interface';

class Map {
  private addresses = addressModel;
  private mapService: OpenStreetMap;

  constructor() {
    this.mapService = new OpenStreetMap();
  }

  public async getAddressData(address: Address): Promise<ExternalAddressData> {
    const cacheKey = this.getCacheKey(address);
    const cachedData: ExternalAddressData = await this.addresses.findOne({ key: cacheKey });

    if (cachedData) {
      return this.formatData(cachedData);
    }

    const data = await this.mapService.getAddressData(address);
    await this.addresses.create({ ...data, key: cacheKey });

    return this.formatData(data);
  }

  public formatData({ lon, lat }: ExternalAddressData): ExternalAddressData {
    return { lon, lat };
  }

  public getCacheKey(address: Address): string {
    const spaces = /\s+/g;
    return [...Object.keys(address)].sort().reduce((acc: string, key: string, i: number) => {
      return `${acc}${i > 0 ? '+' : ''}${address[key].replace(spaces, '+')}`;
    }, '');
  }
}

export default Map;
