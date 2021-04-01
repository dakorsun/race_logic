import {
  CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, BaseEntity,
} from 'typeorm';
import {
  ObjectType, Field, ID,
} from 'type-graphql';

@ObjectType()
export abstract class DefaultEntity extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;
  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;
  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;
}
