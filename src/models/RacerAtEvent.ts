/* eslint-disable @typescript-eslint/lines-between-class-members */
import {
  Sequelize,
  DataTypes,
  Model, ModelStatic,
  Optional,
  UUIDV4,
} from 'sequelize';
import { AssociateModelFn, ModelsObject } from './map';

interface RacerAtEventAttributes {
  id: string,
  racerId: string,
  eventId: string,
  createdAt: Date,
  updatedAt: Date,
}

interface RacerAtEventCreationAttributes extends Optional<RacerAtEventAttributes, 'id' |'createdAt' | 'updatedAt'> {}

export class RacerAtEvent extends Model<RacerAtEventAttributes, RacerAtEventCreationAttributes> implements RacerAtEventAttributes {
  public id: string;
  public racerId: string;
  public eventId: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public static associations: {
  };
}

// eslint-disable-next-line func-names
export default function InitRacerAtEvent(sequelize: Sequelize):[ModelStatic<Model<RacerAtEventAttributes, RacerAtEventCreationAttributes>>, AssociateModelFn] {
  RacerAtEvent.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.CHAR(36).BINARY,
      defaultValue: UUIDV4,
    },
    racerId: {
      type: DataTypes.CHAR(36).BINARY,
    },
    eventId: {
      type: DataTypes.CHAR(36).BINARY,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci',
    tableName: 'racer_at_event',
    sequelize,
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-empty-pattern
  function associate({ }: ModelsObject): void {
  }
  return [RacerAtEvent, associate];
}
