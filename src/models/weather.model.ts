import { model, Schema, Document } from 'mongoose';
import { WeatherData } from '@interfaces/weather.interface';
import config from 'config';

const weatherSchema: Schema = new Schema({
  key: {
    type: String,
    index: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  coord: {
    lon: {
      type: Number,
      required: true,
    },
    lat: {
      type: Number,
      required: true,
    },
  },
  main: {
    temp: {
      type: Number,
      required: true,
    },
    feels_like: {
      type: Number,
      required: true,
    },
    temp_min: {
      type: Number,
      required: true,
    },
    temp_max: {
      type: Number,
      required: true,
    },
    pressure: {
      type: Number,
      required: true,
    },
    humidity: {
      type: Number,
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: Number(config.get('cache.ttl')),
  },
});

const weatherModel = model<WeatherData & Document>('Weather', weatherSchema);

export default weatherModel;
