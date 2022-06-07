import { Field, ObjectType } from '@nestjs/graphql';
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
  @Field(() => Date)
  birthDay: Date;

  @Column()
  @Field(() => String)
  phoneNumber: string;

  @Column()
  @Field(() => String)
  email: string;

  @Column({ nullable: false })
  // @Field(() => String, { nullable: false })
  password: string;

  @Column({ default: false })
  isLogin: boolean;

  @DeleteDateColumn()
  deletedAt: Date;
}
