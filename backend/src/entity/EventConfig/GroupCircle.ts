import { ChildEntity } from 'typeorm';
import { EventTypes } from '../../config/types';
import EventConfig from './index';

const { CircleEventConfigExtender, GroupEventConfigExtender, HopeStageOptionalityExtender } = require('./mixins');

@ChildEntity()
class GroupCircle extends CircleEventConfigExtender(
    GroupEventConfigExtender(
      HopeStageOptionalityExtender(
        EventConfig,
      ),
    ),
  ) {
  type: EventTypes.GROUP_CIRCLE;
}

export default GroupCircle;
