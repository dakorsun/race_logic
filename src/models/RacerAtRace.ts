/* eslint-disable @typescript-eslint/lines-between-class-members */
import {
  Sequelize,
  DataTypes,
  Model, ModelStatic,
  Optional,
  UUIDV4, Association,
} from 'sequelize';
import { Lap } from './Lap';
import { AssociateModelFn, ModelsObject } from './map';

interface RacerAtRaceAttributes {
  id: string,
  racerId: string,
  raceId: string,
  createdAt: Date,
  updatedAt: Date,
}

interface RacerAtRaceCreationAttributes extends Optional<RacerAtRaceAttributes, 'id' |'createdAt' | 'updatedAt'> {}

export class RacerAtRace extends Model<RacerAtRaceAttributes, RacerAtRaceCreationAttributes> implements RacerAtRaceAttributes {
  public id: string;
  public racerId: string;
  public raceId: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date ;
  public static associations: {
    laps: Association<RacerAtRace, Lap>;
  };
}

// eslint-disable-next-line func-names
export default function InitRacerAtRace(sequelize: Sequelize):[ModelStatic<Model<RacerAtRaceAttributes, RacerAtRaceCreationAttributes>>, AssociateModelFn] {
  RacerAtRace.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.CHAR(36).BINARY,
      defaultValue: UUIDV4,
    },
    racerId: {
      type: DataTypes.CHAR(36).BINARY,
    },
    raceId: {
      type: DataTypes.CHAR(36).BINARY,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci',
    tableName: 'racer_at_race',
    sequelize,
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-empty-pattern
  function associate({ Lap: LapModel }: ModelsObject): void {
    RacerAtRace.hasMany(LapModel, { foreignKey: 'racer_at_race_id' });
  }
  return [RacerAtRace, associate];
}
