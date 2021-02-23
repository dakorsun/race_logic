import express, { Express } from 'express';
import clientExpressSetup from './setup/express/client';
import serverExpressSetup from './setup/express/server';

const expressApp: Express = express();

clientExpressSetup(expressApp);
serverExpressSetup(expressApp);

export default expressApp;
