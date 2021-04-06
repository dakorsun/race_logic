import { ChildEntity } from 'typeorm';
import { EventTypes } from '../../../config/types';
import EventConfig from './index';

const { SoloEventConfigExtender, CircleEventConfigExtender } = require('./mixins');

@ChildEntity()
export default class SoloCircle extends CircleEventConfigExtender(
  SoloEventConfigExtender(
    EventConfig,
  ),
) {
  type: EventTypes.SOLO_CIRCLE;
}
