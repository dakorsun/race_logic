import { Server } from 'http';
import express, { Express } from 'express';
import appConfig from './config/appConfig';
import apolloSetup from './setup/apolloSetup';
import serverSetup from './setup/express/server';

const { APOLLO_PORT: apolloPort, PORT: port, HOST: host } = appConfig;
const expressApp: Express = express();
serverSetup(expressApp);
const server = new Server(expressApp);
// todo logging
// eslint-disable-next-line no-console
server.listen(port, () => console.log(`Server started on ${host}:${port}`));

apolloSetup().then((apolloServer) => {
  apolloServer.listen(apolloPort);
  console.log(`Apollo server started on ${host}:${apolloPort}`);
});
