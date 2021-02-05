// eslint-disable-next-line max-classes-per-file
import {
  Sequelize,
  DataTypes,
  Model, ModelStatic,
  Optional,
  UUIDV4,
} from 'sequelize';
import { AssociateModelFn } from './map';

interface TranslationAttributes {
  id: string,
  languageId: string,
  value: string,
  createdAt: Date,
  updatedAt: Date,

}

interface TranslationCreationAttributes extends Optional<TranslationAttributes, 'id' |'createdAt' | 'updatedAt'> {}

export class Translation extends Model<TranslationAttributes, TranslationCreationAttributes> implements TranslationAttributes {
  public id: string;
  public languageId: string;
  public value: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
}

// eslint-disable-next-line func-names
export default function InitTranslation(sequelize: Sequelize): [ModelStatic<Model<TranslationAttributes, TranslationCreationAttributes>>, AssociateModelFn] {
  Translation.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.CHAR(36).BINARY,
      defaultValue: UUIDV4,
    },
    languageId: {
      allowNull: false,
      type: DataTypes.CHAR(36).BINARY,
    },
    value: {
      type: DataTypes.STRING,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci',
    tableName: 'translation',
    sequelize,
  });

  const associate: AssociateModelFn = ({ Language }) => {
    Translation.belongsToMany(Language, { through: 'LanguageTranslation', foreignKey: 'translationId' });
  };

  return [Translation, associate];
}
