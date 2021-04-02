import { Field, InputType } from 'type-graphql';

@InputType()
export class QueryStringParameters {
  @Field(() => String, { nullable: true })
  q: string;
}

@InputType()
export class PaggingQueryParameters extends QueryStringParameters {
  @Field(() => Number, { nullable: true })
  skip: number;
  @Field(() => Number, { nullable: true })
  limit: number;
}
