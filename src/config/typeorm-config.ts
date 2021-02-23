import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import appConfig from './appConfig';

import { Event } from '../entity/Event';
import { Lap } from '../entity/Lap';
import { Race } from '../entity/Race';
import { Racer } from '../entity/Racer';
import { RacerAtEvent } from '../entity/RacerAtEvent';
import { RacerAtRace } from '../entity/RacerAtRace';

const typeormConfig = {
  type: 'postgres',
  host: appConfig.POSTGRESQL.URL,
  port: appConfig.POSTGRESQL.PORT,
  username: appConfig.POSTGRESQL.USER,
  password: appConfig.POSTGRESQL.PASSWORD,
  database: appConfig.POSTGRESQL.DB,
  entities: [
    Event,
    Lap,
    Race,
    Racer,
    RacerAtEvent,
    RacerAtRace,
  ],
  synchronize: true,
} as PostgresConnectionOptions;

export default typeormConfig;
