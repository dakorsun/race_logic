import { ClientConfig } from './clientConfig.map';

const clientConfig = {
  APOLLO_HOST: process.env.CLIENT_APOLLO_HOST,
  APOLLO_PORT: process.env.CLIENT_APOLLO_PORT,
} as ClientConfig;

export default Object.freeze(clientConfig);
