/* eslint-disable import/no-cycle */
import {
  Column,
  Entity,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { DefaultEntity } from './map';
import { usedUserRoles } from '../config/constants';
import { UserRoles } from '../config/types';

export interface DefaultUser {
  id: number
  firstName: string
  lastName: string
  email: string
  role: string
}

@Entity()
@ObjectType()
export default class User extends DefaultEntity {
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
  role: string;
  toJSON(): DefaultUser {
    return {
      ...this as DefaultUser,
    };
  }
}
