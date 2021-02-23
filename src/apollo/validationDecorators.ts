import {
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import { dateDayRegEx } from '../config/constants';

export function IsArrayAnDateRange(validationOptions?: ValidationOptions) {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: 'isArrayAnDateRange',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          const isArrayAnArray = Array.isArray(value);
          const isArrayLengthIsEqualTwo = value.length === 2;
          const isEachElementIsMatchingRegEx = value.reduce((accum: Boolean, item: string) => {
            if (accum) {
              return dateDayRegEx.test(item);
            }
            return accum;
          }, true);
          const isEachElementIsValidDate = value.reduce((accum: Boolean, item: string) => {
            if (accum) {
              return !isNaN(Date.parse(item));
            }
            return accum;
          }, true);
          return isArrayAnArray
                    && isArrayLengthIsEqualTwo
                    && isEachElementIsMatchingRegEx
                    && isEachElementIsValidDate;
        },
      },
    });
  };
}

export function isDateRangeIsSequentiallyValid(validationOptions?: ValidationOptions) {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: 'isDateRangeIsSequentiallyValid',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          const date1 = Date.parse(value[0]);
          const date2 = Date.parse(value[1]);
          return date1 <= date2;
        },
      },
    });
  };
}
