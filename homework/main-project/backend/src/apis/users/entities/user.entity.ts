import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  email: string;

  @Column({ nullable: false })
  // @Field(() => String, { nullable: false })
  password: string;

  @Column({ nullable: true })
  @Field(() => Date)
  birthDay: Date;

  @Column()
  @Field(() => String)
  phoneNumber: string;

  @Column({ default: 0 })
  @Field(() => Int)
  point: number;

  @Column({ default: false })
  isLogin: boolean;

  @DeleteDateColumn()
  deletedAt: Date;
}
