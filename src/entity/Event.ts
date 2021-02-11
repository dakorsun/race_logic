/* eslint-disable import/no-cycle */

import {
  Entity, OneToMany,
} from 'typeorm';
import { ObjectType } from 'type-graphql';
import { DefaultEntity } from './map';
import { RacerAtEvent } from './RacerAtEvent';

@Entity()
@ObjectType()
export class Event extends DefaultEntity {
  //
  // Event to Racer Relation
  @OneToMany(() => RacerAtEvent, (racerAtEvent) => racerAtEvent.event, {
    cascade: true,
  })
  public racerAtEvent: RacerAtEvent[];
  //
  // Event to Racer Relation
}
