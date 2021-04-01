import fs from 'fs';
import axios from 'axios';
import express, { Request, Response } from 'express';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from '../../../client/App';
import React from 'react';
import Html from '../../../Html/Server';
import serverConfig from '../../../config/serverConfig';
import useApollo from '../../../client/apollo/client';

export default (app: express.Application) => {
  const jsFiles: Array<string> = [];

  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  fs.existsSync('./dist/assets') && fs.readdirSync('./dist/assets')?.forEach((file) => {
    if (file.split('.').pop() === 'js') jsFiles.push(`/assets/${file}`);
  });

  axios.defaults.baseURL = `${serverConfig.HOST}:${serverConfig.PORT}`;

  app.use('/assets', express.static('./dist/assets'));

  const [ApolloProvider, client] = useApollo();
  app.get('*', async (req: Request, res: Response) => {
    ReactDOMServer.renderToNodeStream(
      <Html scripts={jsFiles}>
        <ApolloProvider client={client}>
          <StaticRouter location={req.url} context={{}}>
            <App />
          </StaticRouter>
        </ApolloProvider>
      </Html>,
    ).pipe(res);
  });
};
