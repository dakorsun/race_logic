import { ChildEntity } from 'typeorm';
import { EventTypes } from '../../../config/types';
import EventConfig from './index';

const { CircleEventConfigExtender, DuelEventConfigExtender } = require('./mixins');

@ChildEntity()
export default class DuelCircle extends CircleEventConfigExtender(
  DuelEventConfigExtender(
    EventConfig,
  ),
) {
  type: EventTypes.DUEL_CIRCLE;
}
