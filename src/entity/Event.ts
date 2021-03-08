/* eslint-disable import/no-cycle */
import {
  Column,
  Entity, OneToMany,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { DefaultEntity } from './map';
import RacerAtEvent from './RacerAtEvent';

@Entity()
@ObjectType()
export default class Event extends DefaultEntity {
  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', nullable: true })
  name: string;
  @Field(() => Date)
  @Column({ type: 'timestamp' })
  dateFrom: Date;
  @Field(() => Date)
  @Column({ type: 'timestamp' })
  dateTo: Date;
  //
  // Racer at Event Relation
  @OneToMany(() => RacerAtEvent, (racerAtEvent) => racerAtEvent.event, {
    cascade: true,
  })
  public racerAtEvent: RacerAtEvent[];
}
