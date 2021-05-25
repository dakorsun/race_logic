import 'reflect-metadata';
import apolloServerSetup from './setup/apolloServerSetup';

import serverConfig from './config/serverConfig';
import setupConnection from './setup/typeorm';
const { PORT: port, HOST: host } = serverConfig;

(async () => {
// eslint-disable-next-line @typescript-eslint/no-unused-vars
  await setupConnection();

  const apolloServer = await apolloServerSetup();
  apolloServer.listen(`${port}`);
  console.log(`Apollo server started on ${host}:${port}`);
})();
