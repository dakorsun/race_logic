/* eslint-disable import/no-cycle */

import {
  Entity, OneToMany,
} from 'typeorm';
import { ObjectType } from 'type-graphql';
import { DefaultEntity } from './map';
import RacerAtRace from './RacerAtRace';

@Entity()
@ObjectType()
export default class Race extends DefaultEntity {
  //
  // Race to Racer Relation
  @OneToMany(() => RacerAtRace, (racerAtRace) => racerAtRace.race, {
    cascade: true,
  })
  public racerAtRace: RacerAtRace[];
}
