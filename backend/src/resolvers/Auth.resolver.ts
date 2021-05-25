/* eslint-disable class-methods-use-this */
import {
  Query, Mutation,
  Arg, Ctx,
  Resolver,
} from 'type-graphql';
import { LoginCredentials } from '../inputs/AuthInputs';
import AuthService from '../services/Auth';
import UserService from '../services/User';
// eslint-disable-next-line import/no-cycle
import { Context } from '../setup/apolloServerSetup';
import { AuthorizedUser, CommonUser } from '../entity/User';

@Resolver()
export default class AuthResolver {
  @Query(() => (CommonUser || null), { nullable: true })
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
