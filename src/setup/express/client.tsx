import fs from 'fs';
import axios from 'axios';
import express, { Request, Response } from 'express';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from 'App';
import React from 'react';
import Html from '../../Html/Server';
import serverConfig from '../../config/serverConfig';

export default (app: express.Application) => {
  const jsFiles: Array<string> = [];

  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  fs.existsSync('./dist/assets') && fs.readdirSync('./dist/assets')?.forEach((file) => {
    if (file.split('.').pop() === 'js') jsFiles.push(`/assets/${file}`);
  });

  axios.defaults.baseURL = `${serverConfig.HOST}:${serverConfig.PORT}`;

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
};
