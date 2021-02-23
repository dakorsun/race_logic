import {
  Resolver, Query, Mutation, Arg,
} from 'type-graphql';
import { Event } from '../../entity/Event';
import { CreateEventInput } from '../inputs/CreateEventInput';

@Resolver()
export class EventResolver {
  @Query(() => [Event])
  // eslint-disable-next-line class-methods-use-this
  events() {
    return Event.find();
  }
  @Mutation(() => Event)
  // eslint-disable-next-line class-methods-use-this
  async createEvent(@Arg('data') data: CreateEventInput) {
    const event = Event.create(data).save();
    return event;
  }
}
