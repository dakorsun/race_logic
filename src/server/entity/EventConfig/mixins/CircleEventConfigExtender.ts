import { ChildEntity } from 'typeorm';
import { Constructor } from '../../../../utils/classesUtils';

export default function CircleEventConfigExtender<TBase extends Constructor>(Base: TBase) {
  @ChildEntity()
  abstract class CircleEventConfig extends Base {

  }
  return CircleEventConfig;
}
