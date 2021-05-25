/* eslint-disable import/no-cycle */
import {
  Column,
  Entity, TableInheritance,
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import { DefaultEntity } from './utils';
import { TokenStringScalarType, usedUserRoles } from '../config/constants';
import { TokenString, UserRoles } from '../config/types';

@ObjectType()
export class AuthorizedUser {
  @Field(() => ID)
  id: number;
  @Field(() => TokenStringScalarType)
  token: TokenString;
}

@ObjectType()
export class CommonUser {
  @Field(() => ID)
  id: number;
  @Field(() => String)
  nickname: string;
  @Field(() => String)
  role: UserRoles;
}

@ObjectType()
export class DefaultUser {
  @Field(() => ID)
  id: number;
  @Field(() => String)
  firstName: string;
  @Field(() => String)
  lastName: string;
  @Field(() => String)
  email: string;
  @Field(() => String)
  role: UserRoles;
  @Field(() => Date)
  createdAt: Date;
  @Field(() => Date)
  updatedAt: Date;
}

export interface AuthUser {
  id: number
  token: string
}

@Entity()
@TableInheritance({ column: { name: 'role', enum: UserRoles } })
@ObjectType()
export default abstract class User extends DefaultEntity {
  @Field(() => String)
  @Column({ type: 'varchar' })
  firstName: string;
  @Field(() => String)
  @Column({ type: 'varchar' })
  lastName: string;
  @Field(() => String)
  @Column({ type: 'varchar', unique: true })
  email: string;
  @Field(() => String)
  @Column({ type: 'varchar' })
  password: string;
  @Field(() => String)
  @Column({ type: 'enum', enum: UserRoles, default: usedUserRoles.ROLE_USER })
  abstract role: UserRoles;
  get nickname() : string {
    return `${this.firstName} ${this.lastName}`;
  }
  toJSON(): DefaultUser {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      role: this.role,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,

    };
  }
  toCommonJSON(): CommonUser {
    return {
      id: this.id,
      nickname: this.nickname,
      role: this.role,
    };
  }
  toAuthJSON(): Pick<AuthUser, 'id'> {
    return {
      id: this.id,
    };
  }
}
