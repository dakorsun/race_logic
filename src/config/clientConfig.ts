import { ClientConfig } from './clientConfig.map';

const clientConfig = {
  APOLLO_HOST: process.env.HOST,
  APOLLO_PORT: process.env.SERVER_APOLLO_PORT,
} as ClientConfig;

export default Object.freeze(clientConfig);
