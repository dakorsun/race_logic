// eslint-disable-next-line max-classes-per-file
import {
  Sequelize,
  DataTypes,
  Model, ModelStatic,
  Optional,
  UUIDV4, Association,
} from 'sequelize';
import { AssociateModelFn, ModelsObject } from './map';
import { Translation } from './Translation';
import { usedLanguagesArray } from '../config/constants';

interface LanguageAttributes {
  id: string,
  type: string,
  createdAt: Date,
  updatedAt: Date,

}

interface LanguageCreationAttributes extends Optional<LanguageAttributes, 'id' |'createdAt' | 'updatedAt'> {}

export class Language extends Model<LanguageAttributes, LanguageCreationAttributes> implements LanguageAttributes {
  public id: string;
  public type: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date ;
  public static associations: {
    translations: Association<Language, Translation>;
  };
}

// eslint-disable-next-line func-names
export default function InitLanguage(sequelize: Sequelize):[ModelStatic<Model<LanguageAttributes, LanguageCreationAttributes>>, AssociateModelFn] {
  Language.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.CHAR(36).BINARY,
      defaultValue: UUIDV4,
    },
    type: {
      type: DataTypes.ENUM(...usedLanguagesArray),
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci',
    tableName: 'language',
    sequelize,
  });
  function associate({
    Translation: TranslationModel,
    // LanguageTranslation: LanguageTranslationModel,
  }: ModelsObject): void {
    // Language.hasMany(TranslationModel, { foreignKey: 'languageId' });
    Language.belongsToMany(TranslationModel, { through: 'LanguageTranslation', foreignKey: 'languageId' });
  }
  return [Language, associate];
}
