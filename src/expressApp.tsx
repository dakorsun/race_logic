import fs from 'fs';
import express, { Express } from 'express';
import compression from 'compression';
import axios from 'axios';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App';
import Html from './Html/Server';
import appConfig from './config/appConfig';

const expressApp: Express = express();
const jsFiles: Array<string> = [];

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
fs.existsSync('./dist/assets') && fs.readdirSync('./dist/assets')?.forEach((file) => {
  if (file.split('.').pop() === 'js') jsFiles.push(`/assets/${file}`);
});

axios.defaults.baseURL = `${appConfig.HOST}:${appConfig.PORT}`;

expressApp.get('/ping', async (req, res) => {
  res.send('pong');
});

expressApp.use(compression());

expressApp.use('/assets', express.static('./dist/assets'));

expressApp.get('*', async (req, res) => {
  ReactDOMServer.renderToNodeStream(
    <Html scripts={jsFiles}>
      <StaticRouter location={req.url} context={{}}>
        <App />
      </StaticRouter>
    </Html>,
  ).pipe(res);
});

expressApp.use(helmet());
expressApp.use(bodyParser.json());
expressApp.use(cookieParser());

export default expressApp;
