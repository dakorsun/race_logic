import { Server } from 'http';
import expressApp from './expressApp';
import serverConfig from '../config/serverConfig';
import apolloSetup from './setup/apolloSetup';

const { PORT: port, HOST: host } = serverConfig;
const index = new Server(expressApp);
// todo logging
// eslint-disable-next-line no-console
index.listen(port, () => console.log(`Server started on ${host}:${port}`));

apolloSetup().then((apolloServer) => {
  apolloServer.listen(`${+port + 1}`);
  console.log(`Apollo server started on ${host}:${+port + 1}`);
});
