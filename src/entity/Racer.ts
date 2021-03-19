/* eslint-disable import/no-cycle */

import {
  Entity, OneToMany,
} from 'typeorm';
import { ObjectType } from 'type-graphql';
import RacerAtEvent from './RacerAtEvent';
import RacerAtRace from './RacerAtRace';
import User from './User';

@Entity()
@ObjectType()
export default class Racer extends User {
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
