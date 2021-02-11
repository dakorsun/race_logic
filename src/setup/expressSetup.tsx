import fs from 'fs';
import axios from 'axios';
import compression from 'compression';
import express, { Request, Response } from 'express';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from 'App';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import React from 'react';
import Html from '../Html/Server';
import 'reflect-metadata';
import setupConnection from './typeorm';
import appConfig from '../config/appConfig';

export default (app: express.Application) => {
  const jsFiles: Array<string> = [];

  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  fs.existsSync('./dist/assets') && fs.readdirSync('./dist/assets')?.forEach((file) => {
    if (file.split('.').pop() === 'js') jsFiles.push(`/assets/${file}`);
  });

  axios.defaults.baseURL = `${appConfig.HOST}:${appConfig.PORT}`;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setupConnection().then((connection) => {

  });

  app.get('/ping', async (req: Request, res: Response) => {
    res.send('pong');
  });

  app.use(compression());

  app.use('/assets', express.static('./dist/assets'));

  app.get('*', async (req: Request, res: Response) => {
    ReactDOMServer.renderToNodeStream(
      <Html scripts={jsFiles}>
        <StaticRouter location={req.url} context={{}}>
          <App />
        </StaticRouter>
      </Html>,
    ).pipe(res);
  });

  app.use(helmet());
  app.use(bodyParser.json());
  app.use(cookieParser());
};
