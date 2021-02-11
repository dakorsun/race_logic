import express, { Express } from 'express';
import expressSetup from './setup/expressSetup';

const expressApp: Express = express();

expressSetup(expressApp);

export default expressApp;
