import { ChildEntity } from 'typeorm';
import { EventTypes } from '../../config/types';
import EventConfig from './index';

const { SprintEventConfigExtender, DuelEventConfigExtender } = require('./mixins');

@ChildEntity()
export default class DuelSprint extends SprintEventConfigExtender(
  DuelEventConfigExtender(
    EventConfig,
  ),
) {
  type: EventTypes.DUEL_SPRINT;
}
