import axios from 'axios';
import compression from 'compression';
import express, { Request, Response } from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import 'reflect-metadata';
import jwt from 'express-jwt';
import setupConnection from '../typeorm';
import serverConfig from '../../../config/serverConfig';

export default (app: express.Application) => {
  axios.defaults.baseURL = `${serverConfig.HOST}:${serverConfig.PORT}`;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setupConnection().then((connection) => {

  });

  // Mount a jwt or other authentication middleware that is run before the GraphQL execution
  app.use(
    '',
    jwt({
      algorithms: ['RS256'],
      secret: serverConfig.APP_SECRET_KEY,
      credentialsRequired: false,
      getToken: (req) => {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
          return req.headers.authorization.split(' ')[1];
        } if (req.query && req.query.token) {
          return req.query.token;
        }
        return null;
      },
    }),
  );

  app.get('/ping', async (req: Request, res: Response) => {
    res.send('pong');
  });

  app.use(compression());

  app.use(helmet());
  app.use(bodyParser.json());
  app.use(cookieParser());
};
