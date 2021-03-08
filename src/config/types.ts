export enum Languages {
  EN = 'EN_en',
  RU = 'Ru_ru',
}

export enum LapTypes {
  FULL = 'FUll',
  TWO_PARTS = 'TWO_PARTS',
}
export enum UserRoles {
  ROLE_USER = 'ROLE_USER',
  ROLE_ADMIN = 'ROLE_ADMIN',
}
// string format like 2000-01-31
export interface DateRangeSearchCriteria {
	from: Date
	to: Date
}

export type TokenString = `Bearer ${string}`;
