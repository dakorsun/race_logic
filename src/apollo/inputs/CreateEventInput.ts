import { Field, InputType } from 'type-graphql';
import { IsArrayAnDateRange, isDateRangeIsSequentiallyValid } from '../validationDecorators';
import { DateRange } from '../../config/constants';

@InputType()
export class CreateEventInput {
  @Field(() => String!)
  name: string;
  @Field(() => DateRange)
  @isDateRangeIsSequentiallyValid({
    message: 'The first item date in a "$property" property array should be earlier than second array item date',
  })
  @IsArrayAnDateRange({
    message: 'Date property should be an array with two values in format "yyyy/mm/dd"',
  })
  date: string[];
}

@InputType()
export class UpdateEventInput {
  @Field(() => String)
  name: string;
  @Field(() => [String!])
  @isDateRangeIsSequentiallyValid({
    message: 'The first item date in a "$property" property array should be earlier than second array item date',
  })
  @IsArrayAnDateRange({
    message: 'Date property should be an array with two values in format "yyyy/mm/dd"',
  })
  date: string[];
}
