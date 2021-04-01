/* eslint-disable class-methods-use-this */
import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Field, ID, ObjectType } from 'type-graphql';
import { LoginCredentials } from '../apollo/inputs/AuthInputs';
// eslint-disable-next-line import/no-cycle
import { TokenStringScalarType } from '../../config/constants';
import { TokenString, UserTokenObject } from '../../config/types';
import serverConfig from '../../config/serverConfig';
import User from '../entity/User';

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
  comparePassword(passwordToCheck: string, originalPassword: string): Promise<boolean> {
    return compare(passwordToCheck, originalPassword);
  }
  decodeUserToken(token: string): UserTokenObject | null {
    try {
      return jwt.verify(token, serverConfig.JWT.SECRET) as UserTokenObject;
    } catch (e) {
      console.error(e);
      return null;
    }
  }
  hashPassword(password: string): Promise<string> {
    return hash(password, 12);
  }
  async loginUser(credentials: LoginCredentials): Promise<AuthorizedUser> {
    try {
      const user = await User.findOne({ where: { email: credentials.email } });
      if (!user) throw new Error('No User match specified email');
      const passwordValid = await this.comparePassword(credentials.password, user.password);
      if (!passwordValid) throw new Error('Password is wrong');
      const token = jwt.sign({
        id: user.id,
        role: user.role,
      } as unknown as UserTokenObject, serverConfig.JWT.SECRET, {
        expiresIn: serverConfig.JWT.EXPIRES_IN,
      });
      return {
        ...user.toAuthJSON(),
        token: `Bearer ${token}`,
      } as AuthorizedUser;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}

export default new AuthService();
