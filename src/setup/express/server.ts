import axios from 'axios';
import compression from 'compression';
import express, { Request, Response } from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import 'reflect-metadata';
import setupConnection from '../typeorm';
import appConfig from '../../config/appConfig';

export default (app: express.Application) => {
  axios.defaults.baseURL = `${appConfig.HOST}:${appConfig.PORT}`;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setupConnection().then((connection) => {

  });

  app.get('/ping', async (req: Request, res: Response) => {
    res.send('pong');
  });

  app.use(compression());

  app.use(helmet());
  app.use(bodyParser.json());
  app.use(cookieParser());
};
