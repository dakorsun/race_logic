import 'reflect-metadata';
import express, { Express } from 'express';
import serverConfig from './config/serverConfig';
import apolloSetup from './setup/apolloSetup';
import serverSetup from './setup/express/server';

const { APOLLO, HOST } = serverConfig;
const expressApp: Express = express();
serverSetup(expressApp);
// todo logging
// eslint-disable-next-line no-console

apolloSetup().then((apolloServer) => {
  apolloServer.listen(APOLLO.PORT);
  console.log(`\nApollo server started on ${HOST}:${APOLLO.PORT}`);
});
