import { ChildEntity, Column } from 'typeorm';
import { Field } from 'type-graphql';
import { Constructor } from '../../../../utils/classesUtils';

export default function GroupEventConfigExtender<TBase extends Constructor>(Base: TBase) {
  @ChildEntity()
  abstract class GroupEventConfig extends Base {
    @Field(() => Number)
    @Column({ type: 'int', nullable: true })
    racersAtStageAmount: number;
    @Field(() => Number)
    @Column({ type: 'int', nullable: true })
    nextStagePassRacersAmount: number;
  }
  return GroupEventConfig;
}
