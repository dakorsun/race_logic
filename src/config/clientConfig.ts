import { ClientConfig } from './clientConfig.map';

const clientConfig = {
  APOLLO: {
    HOST: process.env.HOST,
    PORT: process.env.APOLLO__PORT,
    QUERY: {
      POLL_INTERVAL: +process.env.APOLLO__QUERY__POLL_INTERVAL,
    },
  },
} as ClientConfig;

export default Object.freeze(clientConfig);
