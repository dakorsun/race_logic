import { sequelize } from '../setup/sequelize';
import { ModelsObject, InitializeModelFn, FunctionsObject } from './map';

import InitTranslation from './Translation';
import InitLanguage from './Language';
import InitLanguageTranslation from './LanguageTranslation';
import InitValueLanguagesTranslations from './ValueLanguagesTranslations';

import InitRacer from './Racer';
import InitEvent from './Event';
import InitRacerAtEvent from './RacerAtEvent';
import InitRace from './Race';
import InitRacerAtRace from './RacerAtRace';
import InitLap from './Lap';

const modelsModules: InitializeModelFn[] = [
  InitTranslation,
  InitLanguage,
  InitLanguageTranslation,
  InitValueLanguagesTranslations,

  InitRacer,

  InitEvent,
  InitRacerAtEvent,

  InitRace,
  InitRacerAtRace,
  InitLap,
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
