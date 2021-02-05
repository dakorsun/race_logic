import {
  Sequelize,
  DataTypes,
  Model, ModelStatic,
  Optional,
  UUIDV4,
} from 'sequelize';
import { AssociateModelFn, ModelsObject } from './map';

interface ValueLanguagesTranslationsAttributes {
  id: string,
  createdAt: Date,
  updatedAt: Date,

}

interface ValueLanguagesTranslationsCreationAttributes extends Optional<ValueLanguagesTranslationsAttributes, 'id' |'createdAt' | 'updatedAt'> {}

export class ValueLanguagesTranslations extends Model<ValueLanguagesTranslationsAttributes, ValueLanguagesTranslationsCreationAttributes> implements ValueLanguagesTranslationsAttributes {
  public id: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public static associations: {
  };
}

// eslint-disable-next-line func-names
export default function InitValueLanguagesTranslations(sequelize: Sequelize):[ModelStatic<Model<ValueLanguagesTranslationsAttributes, ValueLanguagesTranslationsCreationAttributes>>, AssociateModelFn] {
  ValueLanguagesTranslations.init({
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
    tableName: 'value_languages_translations',
    sequelize,
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function associate({ LanguageTranslation: LanguageTranslationModel }: ModelsObject): void {
    ValueLanguagesTranslations.hasMany(LanguageTranslationModel, { foreignKey: 'value_languages_translations_id' });
  }
  return [ValueLanguagesTranslations, associate];
}
