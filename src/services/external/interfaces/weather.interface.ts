export interface Coordinates {
  lon: string;
  lat: string;
}

export interface ExternalWeatherData {
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
