import { cleanEnv, port, str } from 'envalid';

const validateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),
    OPEN_WEATHER_API_KEY: str(),
    MONGO_HOST: str(),
    MONGO_PORT: port(),
    MONGO_DATABASE: str(),
  });
};

export default validateEnv;
