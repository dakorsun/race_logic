import { ChildEntity } from 'typeorm';
import { EventTypes } from '../../config/types';
import EventConfig from './index';

const { SprintEventConfigExtender, GroupEventConfigExtender, HopeStageOptionalityExtender } = require('./mixins');

@ChildEntity()
export default class GroupSprint extends SprintEventConfigExtender(
  GroupEventConfigExtender(
    HopeStageOptionalityExtender(
      EventConfig,
    ),
  ),
) {
  type: EventTypes.GROUP_SPRINT;
}
