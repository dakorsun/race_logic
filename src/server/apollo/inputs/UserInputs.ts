import { Field, InputType } from 'type-graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => String!)
  firstName: string;
  @Field(() => String!)
  lastName: string;
  @Field(() => String!)
  @IsEmail()
  email: string;
  @Field(() => String!)
  password: string;
}

@InputType()
export class UpdateUserInput {
  @Field(() => String)
  firstName: string;
  @Field(() => String)
  lastName: string;
  @Field(() => String)
  email: string;
}
