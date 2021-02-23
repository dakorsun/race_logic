import {
  registerDecorator,
  ValidationOptions,
} from 'class-validator';

export function IsTestValidation(validationOptions?: ValidationOptions) {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: 'IsObjectAnDateRange',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          try {
            const isValid = true;
            return isValid;
          } catch (e) {
            console.error(e);
            throw e;
          }
        },
      },
    });
  };
}
