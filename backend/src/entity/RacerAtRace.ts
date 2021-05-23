/* eslint-disable import/no-cycle */

import {
  Column,
  Entity, ManyToOne, OneToMany,
} from 'typeorm';
import { ObjectType } from 'type-graphql';
import { DefaultEntity } from './utils';
import Racer from './Racer';
import Race from './Race';
import Lap from './Lap';

@Entity()
@ObjectType()
export default class RacerAtRace extends DefaultEntity {
  //
  // related racer
  @Column()
  public racerId!: number;
  @ManyToOne(() => Racer, (racer) => racer.racerAtRace)
  public racer!: Racer;
  //
  // related race
  @Column()
  public raceId!: number;
  @ManyToOne(() => Race, (race) => race.racerAtRace)
  public race!: Race;
  //
  // related lap
  @OneToMany(() => Lap, (laps) => laps.racerAtRace)
  public laps!: RacerAtRace[];
}
