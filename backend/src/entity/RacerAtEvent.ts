/* eslint-disable import/no-cycle */

import {
  Column,
  Entity, ManyToOne,
} from 'typeorm';
import { ObjectType } from 'type-graphql';
import { DefaultEntity } from './utils';
import Racer from './Racer';
import Event from './Event';

@Entity()
@ObjectType()
export default class RacerAtEvent extends DefaultEntity {
  @Column()
  public racerId!: number;
  @Column()
  public eventId!: number;
  @ManyToOne(() => Racer, (racer) => racer.racerAtEvent)
  public racer!: Racer;
  @ManyToOne(() => Event, (event) => event.racerAtEvent)
  public event!: Event;
}
