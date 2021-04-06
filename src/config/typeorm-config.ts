import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import serverConfig from './serverConfig';

import Event from '../server/entity/Event';
import Lap from '../server/entity/Lap';
import Race from '../server/entity/Race';
import Racer from '../server/entity/Racer';
import RacerAtEvent from '../server/entity/RacerAtEvent';
import RacerAtRace from '../server/entity/RacerAtRace';
import User from '../server/entity/User';

import EventConfig from '../server/entity/EventConfig/index';
import GroupCircle from '../server/entity/EventConfig/GroupCircle';
import GroupSprint from '../server/entity/EventConfig/GroupSprint';
import DuelCircle from '../server/entity/EventConfig/DuelCircle';
import DuelSprint from '../server/entity/EventConfig/DuelSprint';
import SoloCircle from '../server/entity/EventConfig/SoloCircle';
import SoloSprint from '../server/entity/EventConfig/SoloSprint';

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
