/* eslint-disable class-methods-use-this */
import {
  Query, Mutation,
  Arg, Ctx,
  Resolver, ObjectType, Field, ID,
} from 'type-graphql';
import { LoginCredentials } from '../inputs/AuthInputs';
import AuthService from '../services/Auth';
import UserService from '../services/User';
// eslint-disable-next-line import/no-cycle
import { Context } from '../setup/apolloServerSetup';
import { TokenStringScalarType } from '../config/constants';
import { TokenString } from '../config/types';

@ObjectType()
export class AuthorizedUser {
  @Field(() => ID)
  id: number;
  @Field(() => String)
  firstName: string;
  @Field(() => String)
  lastName: string;
  @Field(() => String)
  email: string;
  @Field(() => String)
  role: string;
  @Field(() => TokenStringScalarType)
  token: TokenString;
}

@Resolver()
export default class AuthResolver {
  @Query(() => (AuthorizedUser || null), { nullable: true })
  async me(@Ctx() context: Context) {
    let user = null;
    if (context.user) {
      user = await UserService.getAuthorizedUserById(`${context.user.id}`);
    }
    return user;
  }
  @Mutation(() => AuthorizedUser)
  async login(@Arg('credentials') credentials: LoginCredentials) {
    return AuthService.loginUser(credentials);
  }
}
