import { GraphQLScalarType } from 'graphql';

export enum Languages {
  EN = 'EN_en',
  RU = 'Ru_ru',
}
export const usedLanguages = Languages;
export const usedLanguagesArray: string[] = Object.values(Languages);

export enum LapTypes {
  FULL = 'FUll',
  TWO_PARTS = 'TWO_PARTS',
}
export const usedLapTypes = LapTypes;
export const usedLapTypesArray: string[] = Object.values(LapTypes);

// string format like 2000-01-31
export const dateDayRegEx = new RegExp(/^\d{4}-\d{2}-\d{2}$/);

export const DateRange = new GraphQLScalarType({
  name: 'DateRange',
  description: 'Array fo two date strings in format "yyyy-mm-dd. First date must be earlier than second',
});
