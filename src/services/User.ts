/* eslint-disable class-methods-use-this */
import {
  DeepPartial,
} from 'typeorm';
import { CreateUserInput, UpdateUserInput } from '../apollo/inputs/UserInputs';
import User from '../entity/User';
import AuthService from './Auth';
import { UserRoles } from '../config/types';

class UserServiceClass {
  async getUserById(id: string): Promise<User> {
    try {
      return await User.findOne({ where: { id } });
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
  async createUser(data: CreateUserInput): Promise<User> {
    try {
      const user = await User.create(data as DeepPartial<User>);
      user.password = await AuthService.hashPassword(user.password);
      user.role = UserRoles.ROLE_ADMIN;
      await user.save();
      return await this.getUserById(`${user.id}`);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
  async updateUser(id: string, data: UpdateUserInput): Promise<User> {
    try {
      const user = await User.findOne({ where: { id } });
      if (!user) throw new Error('No User found');
      Object.assign(user, data);
      await user.save();
      return user;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
  async removeUser(id: string): Promise<boolean> {
    try {
      const user = await User.findOne({ where: { id } });
      if (!user) throw new Error('No User found');
      await user.remove();
      return true;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}

export default new UserServiceClass();
