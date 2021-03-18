/* eslint-disable class-methods-use-this */
import {
  DeepPartial,
} from 'typeorm';
import { CreateUserInput, UpdateUserInput } from '../apollo/inputs/UserInputs';
// eslint-disable-next-line import/no-cycle
import User, { AuthUser, DefaultUser } from '../entity/User';
// eslint-disable-next-line import/no-cycle
import AuthService from './Auth';
import { UserRoles } from '../config/types';

export interface UserSearchParams {
  email: string
}

class UserServiceClass {
  async getUserDefaultValuesById(id: string): Promise<DefaultUser | null> {
    try {
      const user = await User.findOne(id);
      if (user) {
        return {
          ...user.toJSON(),
        };
      }
      return null;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
  async getUserDefaultValuesByParameters(params: UserSearchParams): Promise<DefaultUser> {
    try {
      const user = await User.findOne({ where: { ...params } });
      if (user) {
        return {
          ...user.toJSON(),
        };
      }
      return null;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
  async getAuthorizedUserById(id: string): Promise<AuthUser | null> {
    try {
      const user = await User.findOne(id);
      if (user) {
        return {
          ...user.toAuthJSON(),
        };
      }
      return null;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
  async createUser(data: CreateUserInput): Promise<DefaultUser> {
    try {
      const user = await User.create(data as DeepPartial<User>);
      user.password = await AuthService.hashPassword(user.password);
      user.role = UserRoles.ROLE_ADMIN;
      await user.save();
      return {
        ...user.toJSON(),
      };
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
  async updateUser(id: string, data: UpdateUserInput): Promise<DefaultUser> {
    try {
      const user = await User.findOne(id);
      if (!user) throw new Error('No User found');
      Object.assign(user, data);
      await user.save();
      return {
        ...user.toJSON(),
      };
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
  async removeUser(id: string): Promise<boolean> {
    try {
      const user = await User.findOne(id);
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
