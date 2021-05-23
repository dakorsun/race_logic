import { ChildEntity, Column } from 'typeorm';
import { Field } from 'type-graphql';
import { Constructor } from '../../../utils/classes';
import { EventConfigHopeStagesTypes } from '../../../config/types';

export default function HopeStageOptionalityExtender<TBase extends Constructor>(Base: TBase) {
  @ChildEntity()
  abstract class HopeStageOptionality extends Base {
    // @ts-ignore
    @Field(() => Boolean)
    @Column({ type: 'boolean', default: false })
    hopeStages: boolean;
    // @ts-ignore
    @Field(() => String)
    @Column({ enum: EventConfigHopeStagesTypes, nullable: true })
    hopeStagesType: EventConfigHopeStagesTypes;
  }
  return HopeStageOptionality;
}
