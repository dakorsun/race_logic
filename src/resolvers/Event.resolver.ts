import { Resolver, Query } from 'type-graphql';
import { Event } from '../entity/Event';

@Resolver()
export class EventResolver {
  @Query(() => [Event])
  // eslint-disable-next-line class-methods-use-this
  events() {
    return Event.find();
  }
}
