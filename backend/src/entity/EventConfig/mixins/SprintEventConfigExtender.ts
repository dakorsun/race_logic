import { ChildEntity } from 'typeorm';
import { Constructor } from '../../../utils/classes';

export default function SprintEventConfigExtender<TBase extends Constructor>(Base: TBase) {
  @ChildEntity()
  abstract class SprintEventConfig extends Base {

  }
  return SprintEventConfig;
}
