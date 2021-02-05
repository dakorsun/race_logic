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

interface RaceAttributes {
  id: string,
  createdAt: Date,
  updatedAt: Date,

}

interface RaceCreationAttributes extends Optional<RaceAttributes, 'id' |'createdAt' | 'updatedAt'> {}

export class Race extends Model<RaceAttributes, RaceCreationAttributes> implements RaceAttributes {
  public id: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date ;
  public static associations: {
    racers: Association<Race, Racer>;
  };
}

// eslint-disable-next-line func-names
export default function InitRace(sequelize: Sequelize):[ModelStatic<Model<RaceAttributes, RaceCreationAttributes>>, AssociateModelFn] {
  Race.init({
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
    tableName: 'race',
    sequelize,
  });
  function associate({
    Racer: RacerModel,
  }: ModelsObject): void {
    Race.belongsToMany(RacerModel, { through: 'RacerAtRace', foreignKey: 'raceId' });
  }
  return [Race, associate];
}
