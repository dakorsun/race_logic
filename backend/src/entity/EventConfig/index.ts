import {
  Column, Entity, OneToOne, TableInheritance,
  // JoinColumn,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { EventTypes } from '../../config/types';
import { DefaultEntity } from '../utils';
// eslint-disable-next-line import/no-cycle
import Event from '../Event';

@Entity()
@ObjectType()
@TableInheritance({ column: { name: 'type', enum: EventTypes } })
export default class EventConfig extends DefaultEntity {
  @Field(() => String)
  @Column({ enum: EventTypes, default: EventTypes.SOLO_CIRCLE })
  type: EventTypes;
  @Field(() => Boolean)
  @Column({ type: 'boolean', default: false })
  isInitialized: boolean;
  // Config to Event Relation
  @OneToOne(() => Event, (event) => event.config, {})
  // @JoinColumn()
  event: Event;
}
