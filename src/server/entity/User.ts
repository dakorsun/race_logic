/* eslint-disable import/no-cycle */
import {
  Column,
  Entity, TableInheritance,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { DefaultEntity } from './map';
import { usedUserRoles } from '../../config/constants';
import { UserRoles } from '../../config/types';

export interface DefaultUser {
  id: number
  firstName: string
  lastName: string
  email: string
  role: string
  createdAt: Date
  updatedAt: Date
}

export interface AuthUser {
  id: number
  firstName: string
  lastName: string
  email: string
  role: string
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
  toAuthJSON(): AuthUser {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      role: this.role,
    };
  }
}
