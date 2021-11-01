import axios, { AxiosInstance } from 'axios';
import { HttpException } from '@exceptions/HttpException';
import { Address } from '@interfaces/weather.interface';
import { ExternalAddress, ExternalAddressData } from './interfaces/map.interface';
import config from 'config';

export default class Map {
  private baseUrl: string;
  private axios: AxiosInstance;

  public constructor() {
    this.baseUrl = config.get('external.mapServiceUrl') || '';
    this.axios = axios.create({
      baseURL: this.baseUrl,
      timeout: 25000,
    });
  }

  private _formatAddress(address: Address): ExternalAddress {
    const { street, streetNumber, town, country, postalCode } = address;
    return {
      street: `${streetNumber} ${street}`,
      country: country,
      city: town,
      postalcode: postalCode,
    };
  }

  private async _getAddressData(address: Address): Promise<ExternalAddressData[]> {
    const result = await this.axios.get('/search?format=json', { params: this._formatAddress(address) });
    const data: ExternalAddressData[] = result.data;
    return data;
  }

  public async getAddressData(address: Address): Promise<ExternalAddressData> {
    const [data] = await this._getAddressData(address);
    if (!data) throw new HttpException(404, 'Address is not valid');

    const { lon, lat } = data;
    return { lon, lat };
  }

  public async validateAddress(address: Address): Promise<boolean> {
    const data = await this._getAddressData(address);
    return data.length > 0;
  }
}
