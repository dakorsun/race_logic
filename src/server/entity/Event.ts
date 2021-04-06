/* eslint-disable import/no-cycle */
import {
  Column,
  Entity, JoinColumn, OneToMany, OneToOne,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { DefaultEntity } from './map';
import RacerAtEvent from './RacerAtEvent';
import EventConfig from './EventConfig/index';

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
  racerAtEvent: RacerAtEvent[];
  //
  // Config to Event Relation
  @OneToOne(() => EventConfig, (eventConfig) => eventConfig.event)
  @JoinColumn()
  config: EventConfig;
}
