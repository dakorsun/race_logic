/* eslint-disable class-methods-use-this */
import {
  DeepPartial, LessThanOrEqual, Like, MoreThanOrEqual,
} from 'typeorm';
import { CreateEventInput, FindEventsInput, UpdateEventInput } from '../apollo/inputs/EventInputs';
import Event from '../entity/Event';

class EventServiceModel {
  async getEventById(id: string): Promise<Event> {
    try {
      return await Event.findOne({ where: { id } });
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
  async findEventsByParameters(parameters: FindEventsInput): Promise<Event[]> {
    try {
      const queryClause = {} as any;
      const { name, date } = parameters;
      if (name) {
        queryClause.name = Like(`%${name}%`);
      }

      if (date) {
        if (date.from) {
          queryClause.dateFrom = MoreThanOrEqual(date.from);
        }
        if (date.to) {
          queryClause.dateTo = LessThanOrEqual(date.to);
        }
      }

      return await Event.find({
        where: queryClause,
        order: {
          dateFrom: 'ASC',
          dateTo: 'ASC',
        },
      });
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
  async createEvent(data: CreateEventInput): Promise<Event> {
    try {
      const event = await Event.create(data as DeepPartial<Event>);
      await event.save();
      return await this.getEventById(`${event.id}`);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
  async updateEvent(id: string, data: UpdateEventInput): Promise<Event> {
    try {
      const event = await Event.findOne({ where: { id } });
      if (!event) throw new Error('No Event found');
      Object.assign(event, data);
      await event.save();
      return event;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
  async removeEvent(id: string): Promise<boolean> {
    try {
      const event = await Event.findOne({ where: { id } });
      if (!event) throw new Error('No Event found');
      await event.remove();
      return true;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}

export default new EventServiceModel();
