import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import serverConfig from './serverConfig';

import Event from '../entity/Event';
import Lap from '../entity/Lap';
import Race from '../entity/Race';
import Racer from '../entity/Racer';
import RacerAtEvent from '../entity/RacerAtEvent';
import RacerAtRace from '../entity/RacerAtRace';
import User from '../entity/User';

const typeormConfig = {
  type: 'postgres',
  host: serverConfig.POSTGRESQL.URL,
  port: serverConfig.POSTGRESQL.PORT,
  username: serverConfig.POSTGRESQL.USER,
  password: serverConfig.POSTGRESQL.PASSWORD,
  database: serverConfig.POSTGRESQL.DB,
  entities: [
    Event,
    Lap,
    Race,
    Racer,
    RacerAtEvent,
    RacerAtRace,
    User,
  ],
  synchronize: true,
} as PostgresConnectionOptions;

export default typeormConfig;
