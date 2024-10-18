import type { CorsOptions } from 'cors';

const corsWhitelist = ['http://localhost:3000', 'http://172.20.10.4:3000'];

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || corsWhitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

export const config = {
  port: 8000,
  corsOptions,
  database: 'mongodb://localhost/auth',
};
