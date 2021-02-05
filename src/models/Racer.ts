// eslint-disable-next-line max-classes-per-file
import {
  Sequelize,
  DataTypes,
  Model, ModelStatic,
  Optional,
  UUIDV4, Association,
} from 'sequelize';
import { AssociateModelFn, ModelsObject } from './map';
// eslint-disable-next-line import/no-cycle
import { Event } from './Event';
// import { RacerAtEvent } from './RacerAtEvent';

interface RacerAttributes {
  id: string,
  createdAt: Date,
  updatedAt: Date,

}

interface RacerCreationAttributes extends Optional<RacerAttributes, 'id' |'createdAt' | 'updatedAt'> {}

export class Racer extends Model<RacerAttributes, RacerCreationAttributes> implements RacerAttributes {
  public id: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date ;
  public static associations: {
    events: Association<Racer, Event>;
    races: Association<Racer, Event>;
  };
}

// eslint-disable-next-line func-names
export default function InitRacer(sequelize: Sequelize):[ModelStatic<Model<RacerAttributes, RacerCreationAttributes>>, AssociateModelFn] {
  Racer.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.CHAR(36).BINARY,
      defaultValue: UUIDV4,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci',
    tableName: 'racer',
    sequelize,
  });
  function associate({
    Event: EventModel,
    Race: RaceModel,
  }: ModelsObject): void {
    Racer.belongsToMany(EventModel, { through: 'RacerAtEvent', foreignKey: 'racerId' });
    Racer.belongsToMany(RaceModel, { through: 'RacerAtRace', foreignKey: 'racerId' });
  }
  return [Racer, associate];
}
