/* eslint-disable import/no-cycle */

import {
  Entity, ManyToOne,
} from 'typeorm';
import { ObjectType } from 'type-graphql';
import { DefaultEntity } from './map';
import RacerAtRace from './RacerAtRace';

@Entity()
@ObjectType()
export default class Lap extends DefaultEntity {
  //
  // Lap to RacerAtRace Relation
  @ManyToOne(() => RacerAtRace, (racerAtRace) => racerAtRace.laps)
  racerAtRace: RacerAtRace;
}
