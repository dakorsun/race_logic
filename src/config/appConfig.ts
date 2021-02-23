import dotenv from 'dotenv';
import { AppConfig } from './appConfig.map';

dotenv.config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : undefined });

const appConfig = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  APOLLO_PORT: process.env.APOLLO_PORT,
  POSTGRESQL: {
    URL: process.env.POSTGRESQL_URL,
    USER: process.env.POSTGRESQL_USER,
    PORT: +process.env.POSTGRESQL_PORT,
    PASSWORD: process.env.POSTGRESQL_PASSWORD,
    DB: process.env.POSTGRESQL_DB,
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
} as AppConfig;

export default Object.freeze(appConfig);
