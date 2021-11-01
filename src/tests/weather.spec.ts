import mongoose from 'mongoose';
import request from 'supertest';
import App from '@/app';
import AuthRoute from '@routes/auth.route';
import WeatherRoute from '@routes/weather.route';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
  await mongoose.connection.close();
});

let weatherRoute;
let authRoute;
let app;

describe('Testing Weather', () => {
  beforeAll(() => {
    weatherRoute = new WeatherRoute();
    authRoute = new AuthRoute();
    app = new App([weatherRoute, authRoute]);
  });

  describe('[POST] /weather', () => {
    it('response 401 without Authorization token', async () => {
      return request(app.getServer()).post(`${weatherRoute.path}`).expect(401);
    });
  });
});
