import type { CorsOptions } from 'cors';
import { configDotenv } from 'dotenv';
import path from 'path';

configDotenv();

const rootPath = __dirname;

const corsWhitelist = ['http://localhost:3000', 'http://172.20.10.2:3000', 'http://172.29.176.85:3000'];

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
  database: 'mongodb://localhost/gallery',
  rootPath,
  corsOptions,
  publicPath: path.join(rootPath, 'public'),
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
};
