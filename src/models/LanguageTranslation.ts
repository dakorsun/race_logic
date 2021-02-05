/* eslint-disable @typescript-eslint/lines-between-class-members */
import {
  Sequelize,
  DataTypes,
  Model, ModelStatic,
  Optional,
  UUIDV4,
} from 'sequelize';
import { AssociateModelFn, ModelsObject } from './map';

interface LanguageTranslationAttributes {
  id: string,
  translationId: string,
  languageId: string,
  value_languages_translations_id: string,
  createdAt: Date,
  updatedAt: Date,
}

interface LanguageTranslationCreationAttributes extends Optional<LanguageTranslationAttributes, 'id' |'createdAt' | 'updatedAt'> {}

export class LanguageTranslation extends Model<LanguageTranslationAttributes, LanguageTranslationCreationAttributes> implements LanguageTranslationAttributes {
  public id: string;
  public translationId: string;
  public languageId: string;
  public value_languages_translations_id: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date ;
  public static associations: {
  };
}

// eslint-disable-next-line func-names
export default function InitLanguageTranslation(sequelize: Sequelize):[ModelStatic<Model<LanguageTranslationAttributes, LanguageTranslationCreationAttributes>>, AssociateModelFn] {
  LanguageTranslation.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.CHAR(36).BINARY,
      defaultValue: UUIDV4,
    },
    translationId: {
      type: DataTypes.CHAR(36).BINARY,
    },
    languageId: {
      type: DataTypes.CHAR(36).BINARY,
    },
    value_languages_translations_id: {
      type: DataTypes.CHAR(36).BINARY,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci',
    tableName: 'language_translation',
    sequelize,
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function associate({ ValueLanguagesTranslations: ValueLanguagesTranslationsModel }: ModelsObject): void {
    LanguageTranslation.belongsTo(ValueLanguagesTranslationsModel, { foreignKey: 'value_languages_translations_id' });
  }
  return [LanguageTranslation, associate];
}
