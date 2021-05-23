/* eslint-disable import/no-cycle */

import {
  ChildEntity,
  OneToMany,
} from 'typeorm';
import { ObjectType } from 'type-graphql';
import RacerAtEvent from './RacerAtEvent';
import RacerAtRace from './RacerAtRace';
import User from './User';
import { UserRoles } from '../config/types';

@ChildEntity()
@ObjectType()
export default class Racer extends User {
  role: UserRoles.ROLE_RACER;
  //
  // Racer to Event Relation
  @OneToMany(() => RacerAtEvent, (racerAtEvent) => racerAtEvent.racer, {
    cascade: true,
  })
  public racerAtEvent: RacerAtEvent[];
  //
  // Racer to Race Relation
  @OneToMany(() => RacerAtRace, (racerAtRace) => racerAtRace.racer, {
    cascade: true,
  })
  public racerAtRace: RacerAtRace[];
}
