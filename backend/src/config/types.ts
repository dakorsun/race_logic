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
  ROLE_RACER = 'ROLE_RACER',
  ROLE_ADMIN = 'ROLE_ADMIN',
}
// string format like 2000-01-31
export interface DateRangeSearchCriteria {
  from: Date
  to: Date
}

export interface UserTokenObject {
  id: string;
  role: UserRoles
}

export type TokenString = `Bearer ${string}`;

export enum EventTypes {
  GROUP_CIRCLE = 'GROUP_CIRCLE',
  DUEL_CIRCLE = 'DUEL_CIRCLE',
  SOLO_CIRCLE = 'SOLO_CIRCLE;',
  SOLO_SPRINT = 'SOLO_SPRINT',
  GROUP_SPRINT = 'GROUP_SPRINT',
  DUEL_SPRINT = 'DUEL_SPRINT',
}

export const EventTypesLabels = {
  GROUP_CIRCLE: 'Group Circle',
  DUEL_CIRCLE: 'Duel Circle',
  SOLO_CIRCLE: 'Solo Circle',
  SOLO_SPRINT: 'Solo Sprint',
  GROUP_SPRINT: 'Group Sprint',
  DUEL_SPRINT: 'Duel Sprint',
} as {
  [key: string]: string
};

export enum EventConfigStagesTypes {
  SINGLE = 'SINGLE',
  ONE__SECOND = '1/2',
  ONE__FOURTH = '1/4',
  ONE__EIGHTH = '1/8',
  ONE__SIXTEENTH = '1/16',
  ONE__THIRTY_SECOND = '1/32',
}

export enum EventConfigHopeStagesTypes {
  EACH = 'EACH',
  EACH_SECOND = 'EACH_SECOND',
}
