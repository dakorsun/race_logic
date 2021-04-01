import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import serverConfig from './serverConfig';

import Event from '../server/entity/Event';
import Lap from '../server/entity/Lap';
import Race from '../server/entity/Race';
import Racer from '../server/entity/Racer';
import RacerAtEvent from '../server/entity/RacerAtEvent';
import RacerAtRace from '../server/entity/RacerAtRace';
import User from '../server/entity/User';

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
