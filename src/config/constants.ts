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
export interface DateRangeSearchCriteria {
  from: Date
  to: Date
}
export const DateRangeSearchCriteriaScalarType = new GraphQLScalarType({
  name: 'DateRange_search_criteria',
  description: 'Object with "from" and "to" keys with values matching format "yyyy-mm-dd. "from" date must be earlier than or equal to "to"',
});
