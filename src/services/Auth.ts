/* eslint-disable class-methods-use-this */
import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Field, ID, ObjectType } from 'type-graphql';
import { LoginCredentials } from '../apollo/inputs/AuthInputs';
import User from '../entity/User';
import { TokenStringScalarType } from '../config/constants';
import { TokenString } from '../config/types';
import serverConfig from '../config/serverConfig';

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

class AuthService {
  async loginUser(credentials: LoginCredentials): Promise<AuthorizedUser> {
    try {
      const user = await User.findOne({ where: { email: credentials.email } });
      if (!user) throw new Error('No User match specified email');
      const passwordValid = await this.comparePassword(credentials.password, user.password);
      if (!passwordValid) throw new Error('Password is wrong');
      const token = jwt.sign({
        user: {
          id: user.id,
          role: user.role,
        },
      }, serverConfig.APP_SECRET_KEY);
      return {
        ...user.toJSON(),
        token: `Bearer ${token}`,
      } as AuthorizedUser;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
  hashPassword(password: string): Promise<string> {
    return hash(password, 12);
  }
  comparePassword(passwordToCheck: string, originalPassword: string): Promise<boolean> {
    return compare(passwordToCheck, originalPassword);
  }
}

export default new AuthService();
