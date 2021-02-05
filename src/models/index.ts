import { sequelize } from '../setup/sequelize';
import { ModelsObject, InitializeModelFn, FunctionsObject } from './map';
import InitTranslation from './Translation';
import InitLanguage from './Language';
import InitLanguageTranslation from './LanguageTranslation';
import InitValueLanguagesTranslations from './ValueLanguagesTranslations';

const modelsModules: InitializeModelFn[] = [
  InitTranslation,
  InitLanguage,
  InitLanguageTranslation,
  InitValueLanguagesTranslations,
];

const models: ModelsObject = {};
const functions: FunctionsObject = {};

modelsModules.forEach((fn: InitializeModelFn) => {
  const [model, func] = fn(sequelize);
  // @ts-ignore
  models[model.name] = model;
  // @ts-ignore
  functions[model.name] = func;
});

Object.values(functions)
  .forEach((associate) => {
    if (associate) {
      associate(models);
    }
  });

export default models;
