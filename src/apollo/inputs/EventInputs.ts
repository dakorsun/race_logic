import { Field, InputType } from 'type-graphql';
import { IsDate } from 'class-validator';
import { DateRangeSearchCriteria, DateRangeSearchCriteriaScalarType } from '../../config/constants';

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
export class FindEventsInput {
  @Field(() => String, { nullable: true })
  name: string;
  @Field(() => DateRangeSearchCriteriaScalarType, { nullable: true })
  date: DateRangeSearchCriteria;
}
