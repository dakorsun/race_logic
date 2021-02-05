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
import { RacerAtRace } from './RacerAtRace';
import { usedLapTypesArray } from '../config/constants';

interface LapAttributes {
  id: string,
  racer_at_race_id: string,
  type: string,
  createdAt: Date,
  updatedAt: Date,
}

interface LapCreationAttributes extends Optional<LapAttributes, 'id' |'createdAt' | 'updatedAt'> {}

export class Lap extends Model<LapAttributes, LapCreationAttributes> implements LapAttributes {
  public id: string;
  public racer_at_race_id: string;
  public type: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public static associations: {
    race: Association<Lap, RacerAtRace>;
  };
}

// eslint-disable-next-line func-names
export default function InitLap(sequelize: Sequelize):[ModelStatic<Model<LapAttributes, LapCreationAttributes>>, AssociateModelFn] {
  Lap.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.CHAR(36).BINARY,
      defaultValue: UUIDV4,
    },
    type: {
      type: DataTypes.ENUM(...usedLapTypesArray),
    },
    racer_at_race_id: {
      type: DataTypes.CHAR(36).BINARY,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci',
    tableName: 'lap',
    sequelize,
  });
  function associate({
    RacerAtRace: RacerAtRaceModel,
  }: ModelsObject): void {
    Lap.belongsTo(RacerAtRaceModel, { foreignKey: 'racer_at_race_id' });
  }
  return [Lap, associate];
}
