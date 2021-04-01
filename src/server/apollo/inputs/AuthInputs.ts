import { Field, InputType } from 'type-graphql';

@InputType()
export class LoginCredentials {
  @Field(() => String)
  email: string;
  @Field(() => String)
  password: string;
}
