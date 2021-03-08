/* eslint-disable class-methods-use-this */
import {
  Arg,
  Mutation,
  Resolver,
} from 'type-graphql';
import { LoginCredentials } from '../inputs/AuthInputs';
import AuthService, { AuthorizedUser } from '../../services/Auth';

@Resolver()
export default class AuthResolver {
  @Mutation(() => AuthorizedUser)
  async login(@Arg('credentials') credentials: LoginCredentials) {
    return AuthService.loginUser(credentials);
  }
}
