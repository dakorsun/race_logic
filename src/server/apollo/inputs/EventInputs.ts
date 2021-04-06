import { Field, InputType } from 'type-graphql';
import { IsDate } from 'class-validator';
import { DateRangeSearchCriteriaScalarType } from '../../../config/constants';
import { DateRangeSearchCriteria, EventTypes } from '../../../config/types';
import { PaggingQueryParameters } from './SearchInputs';

@InputType()
export class CreateEventInput {
  @Field(() => String!)
  name: string;
  @Field(() => Date!)
  @IsDate()
  dateFrom: Date;
  @Field(() => Date!)
  @IsDate()
  dateTo: Date;
  @Field(() => String!)
  type: EventTypes;
}

@InputType()
export class UpdateEventInput {
  @Field(() => String, { nullable: true })
  name: string;
  @Field(() => Date)
  @IsDate()
  dateFrom: Date;
  @Field(() => Date)
  @IsDate()
  dateTo: Date;
}
@InputType()
export class FindEventsInput extends PaggingQueryParameters {
  @Field(() => String, { nullable: true })
  name: string;
  @Field(() => DateRangeSearchCriteriaScalarType, { nullable: true })
  date: DateRangeSearchCriteria;
}
