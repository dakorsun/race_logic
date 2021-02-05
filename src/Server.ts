import { Server } from 'http';
import expressApp from './expressApp';
import appConfig from './config/appConfig';

const server = new Server(expressApp);

const { PORT: port, HOST: host } = appConfig;

// todo logging
// eslint-disable-next-line no-console
server.listen(port, () => console.log(`Server started on ${host}:${port}`));
