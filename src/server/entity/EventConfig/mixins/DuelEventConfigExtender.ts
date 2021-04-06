import { ChildEntity } from 'typeorm';
import { Constructor } from '../../../../utils/classesUtils';

export default function DuelEventConfigExtender<TBase extends Constructor>(Base: TBase) {
  @ChildEntity()
  abstract class DuelEventConfig extends Base {

  }
  return DuelEventConfig;
}
