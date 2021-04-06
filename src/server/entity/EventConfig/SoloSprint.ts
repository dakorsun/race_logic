import { ChildEntity } from 'typeorm';
import { EventTypes } from '../../../config/types';
import EventConfig from './index';

const { SoloEventConfigExtender, SprintEventConfigExtender } = require('./mixins');

@ChildEntity()
export default class SoloSprint extends SprintEventConfigExtender(
  SoloEventConfigExtender(
    EventConfig,
  ),
) {
  type: EventTypes.SOLO_SPRINT;
}
