import { ChildEntity } from 'typeorm';
import { Constructor } from '../../../utils/classes';

export default function SoloEventConfigExtender<TBase extends Constructor>(Base: TBase) {
  @ChildEntity()
  abstract class SoloEventConfig extends Base {

  }
  return SoloEventConfig;
}
