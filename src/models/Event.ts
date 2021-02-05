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
import { Racer } from './Racer';

interface EventAttributes {
  id: string,
  createdAt: Date,
  updatedAt: Date,

}

interface EventCreationAttributes extends Optional<EventAttributes, 'id' |'createdAt' | 'updatedAt'> {}

export class Event extends Model<EventAttributes, EventCreationAttributes> implements EventAttributes {
  public id: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date ;
  public static associations: {
    racers: Association<Event, Racer>;
  };
}

// eslint-disable-next-line func-names
export default function InitEvent(sequelize: Sequelize):[ModelStatic<Model<EventAttributes, EventCreationAttributes>>, AssociateModelFn] {
  Event.init({
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
    tableName: 'event',
    sequelize,
  });
  function associate({
    Racer: RacerModel,
  }: ModelsObject): void {
    Event.belongsToMany(RacerModel, { through: 'RacerAtEvent', foreignKey: 'eventId' });
  }
  return [Event, associate];
}
