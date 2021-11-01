export interface WeatherData {
  name: string;
  coord: {
    lon: number;
    lat: number;
  };
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
}

export interface Address {
  postalCode: string;
  street: string;
  streetNumber: string;
  country: string;
  town: string;
}

export interface AddressData {
  lon: string;
  lat: string;
}
