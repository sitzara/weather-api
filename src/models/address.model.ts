import { model, Schema, Document } from 'mongoose';
import { AddressData } from '@interfaces/weather.interface';
import config from 'config';

const addressSchema: Schema = new Schema({
  key: {
    type: String,
    index: true,
    unique: true,
  },
  lon: {
    type: String,
    required: true,
  },
  lat: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: Number(config.get('cache.ttl')),
  },
});

const addressModel = model<AddressData & Document>('Address', addressSchema);

export default addressModel;
