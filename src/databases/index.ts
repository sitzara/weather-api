const host = process.env.MONGO_HOST || '';
const port = process.env.MONGO_PORT || '';
const database = process.env.MONGO_DATABASE || '';

export const dbConnection = {
  url: `mongodb://${host}:${port}/${database}`,
  options: {
    maxPoolSize: 10,
  },
};
