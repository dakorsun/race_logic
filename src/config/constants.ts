import { GraphQLScalarType } from 'graphql';
import { Languages, LapTypes, UserRoles } from './types';

export const AUTH_TOKEN = 'auth-token';

// eslint-disable-next-line no-control-regex
export const EmailRegEx = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

export const usedLanguages = Languages;
export const usedLanguagesArray: string[] = Object.values(Languages);

export const usedLapTypes = LapTypes;
export const usedLapTypesArray: string[] = Object.values(LapTypes);

export const usedUserRoles = UserRoles;
export const usedUserRolesArray: string[] = Object.values(UserRoles);

export const DateRangeSearchCriteriaScalarType = new GraphQLScalarType({
  name: 'DateRange_search_criteria',
  description: 'Object with "from" and "to" keys with values matching format "yyyy-mm-dd. "from" date must be earlier than or equal to "to"',
});

export const TokenStringScalarType = new GraphQLScalarType({
  name: 'Authorization_token',
  description: 'String matching \'Bearer token_string\' format',
});
