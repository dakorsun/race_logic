/* eslint-disable class-methods-use-this */
import {
  Resolver, Query, Mutation, Arg,
} from 'type-graphql';
import Event from '../entity/Event';
import EventService from '../services/Event';
import { CreateEventInput, UpdateEventInput, FindEventsInput } from '../inputs/EventInputs';

@Resolver()
export default class EventResolver {
  @Query(() => [Event])
  events(@Arg('parameters') parameters: FindEventsInput) {
    return EventService.findEventsByParameters(parameters);
  }
  @Query(() => Event)
  eventById(@Arg('id') id: string) {
    return EventService.getEventById(id);
  }
  @Mutation(() => Event)
  async createEvent(@Arg('data') data: CreateEventInput) {
    return EventService.createEvent(data);
  }
  @Mutation(() => Event)
  async updateEvent(@Arg('id') id: string, @Arg('data') data: UpdateEventInput) {
    return EventService.updateEvent(id, data);
  }
  @Mutation(() => Boolean)
  async deleteEvent(@Arg('id') id: string) {
    return EventService.removeEvent(id);
  }
}
