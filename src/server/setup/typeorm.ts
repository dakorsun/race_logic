import 'reflect-metadata';
import { createConnection } from 'typeorm';
import typeormConfig from '../../config/typeorm-config';

function setupConnection() {
  return createConnection(typeormConfig);
}

export default setupConnection;
