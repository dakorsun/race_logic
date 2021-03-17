import dotenv from 'dotenv';
import { ServerConfig } from './serverConfig.map';

dotenv.config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : undefined });

const serverConfig = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  HOST: process.env.HOST,
  PORT: process.env.SERVER_PORT,
  APOLLO_PORT: process.env.SERVER_APOLLO_PORT,
  APP_SECRET_KEY: process.env.SERVER_APP_SECRET_KEY,
  POSTGRESQL: {
    URL: process.env.POSTGRESQL__URL,
    USER: process.env.POSTGRESQL__USER,
    PORT: +process.env.POSTGRESQL__PORT,
    PASSWORD: process.env.POSTGRESQL__PASSWORD,
    DB: process.env.POSTGRESQL__DB,
    DIALECT: 'postgres',
  },
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRATION_TIME: process.env.JWT_EXPIRATION_TIME,
  EMAIL: {
    HOST: process.env.EMAIL_HOST,
    PORT: process.env.EMAIL_PORT,
    USER: process.env.EMAIL_USER,
    PASSWORD: process.env.EMAIL_PASSWORD,
    FROM_EMAIL: process.env.EMAIL_FROM_EMAIL,
    FROM_NAME: process.env.EMAIL_FROM_NAME,
    API_KEY: process.env.EMAIL_API_KEY,
    MESSAGE_FROM: process.env.EMAIL_MESSAGE_FROM,
  },
} as ServerConfig;

export default Object.freeze(serverConfig);
