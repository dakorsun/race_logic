/* eslint-disable class-methods-use-this */
import {
  Resolver, Query, Mutation, Arg,
} from 'type-graphql';
import User from '../../entity/User';
import UserService from '../../services/User';
import { CreateUserInput, UpdateUserInput } from '../inputs/UserInputs';

@Resolver()
export default class UserResolver {
  @Query(() => User)
  userById(@Arg('id') id: string) {
    return UserService.getUserById(id);
  }
  @Mutation(() => User)
  async createUser(@Arg('data') data: CreateUserInput) {
    return UserService.createUser(data);
  }
  @Mutation(() => User)
  async updateUser(@Arg('id') id: string, @Arg('data') data: UpdateUserInput) {
    return UserService.updateUser(id, data);
  }
  @Mutation(() => Boolean)
  async deleteUser(@Arg('id') id: string) {
    return UserService.removeUser(id);
  }
}
