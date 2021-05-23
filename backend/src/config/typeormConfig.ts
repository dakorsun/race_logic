import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import serverConfig from './serverConfig';

import Event from '../entity/Event';
import Lap from '../entity/Lap';
import Race from '../entity/Race';
import Racer from '../entity/Racer';
import RacerAtEvent from '../entity/RacerAtEvent';
import RacerAtRace from '../entity/RacerAtRace';
import User from '../entity/User';

import EventConfig from '../entity/EventConfig/index';
import GroupCircle from '../entity/EventConfig/GroupCircle';
import GroupSprint from '../entity/EventConfig/GroupSprint';
import DuelCircle from '../entity/EventConfig/DuelCircle';
import DuelSprint from '../entity/EventConfig/DuelSprint';
import SoloCircle from '../entity/EventConfig/SoloCircle';
import SoloSprint from '../entity/EventConfig/SoloSprint';

const typeormConfig = {
  type: 'postgres',
  host: serverConfig.POSTGRESQL.URL,
  port: serverConfig.POSTGRESQL.PORT,
  username: serverConfig.POSTGRESQL.USER,
  password: serverConfig.POSTGRESQL.PASSWORD,
  database: serverConfig.POSTGRESQL.DB,
  entities: [
    Event,
    EventConfig,
    GroupCircle,
    GroupSprint,
    DuelCircle,
    DuelSprint,
    SoloCircle,
    SoloSprint,
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
