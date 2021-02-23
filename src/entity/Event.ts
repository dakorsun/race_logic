/* eslint-disable import/no-cycle */

import {
  Column,
  Entity, OneToMany,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { DefaultEntity } from './map';
import { RacerAtEvent } from './RacerAtEvent';
import { DateRange } from '../config/constants';

@Entity()
@ObjectType()
export class Event extends DefaultEntity {
  @Field(() => (DateRange))
  @Column({ type: 'char', length: 64, array: true })
  date: string[];
  //
  // Event to Racer Relation
  @OneToMany(() => RacerAtEvent, (racerAtEvent) => racerAtEvent.event, {
    cascade: true,
  })
  public racerAtEvent: RacerAtEvent[];
}
