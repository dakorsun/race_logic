import { Server } from 'http';
import expressApp from './expressApp';
import appConfig from './config/appConfig';
import apolloSetup from './setup/apolloSetup';

const { PORT: port, HOST: host } = appConfig;
const server = new Server(expressApp);
// todo logging
// eslint-disable-next-line no-console
server.listen(port, () => console.log(`Server started on ${host}:${port}`));

apolloSetup().then((apolloServer) => {
  apolloServer.listen(`${+port + 1}`);
  console.log(`Apollo server started on ${host}:${+port + 1}`);
});
