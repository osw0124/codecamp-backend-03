import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from 'src/apis/users/entities/user.entity';

export enum POINT_TRANSACTION_STATUS_ENUM {
  PAYMENT = 'PAYMENT',
  CANCEL = 'CANCEL',
}

//enum 타입을 Field에 적용하기위한 등록
registerEnumType(POINT_TRANSACTION_STATUS_ENUM, {
  name: 'POINT_TRANSACTION_STATUS_ENUM', //이 이름으로 등록됨
});

//INSERT ONLY TABLE
@Entity()
@ObjectType()
export class PointTransaction {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  impUid: string;

  @Column()
  @Field(() => Int)
  amount: number;

  @Column({ type: 'enum', enum: POINT_TRANSACTION_STATUS_ENUM })
  @Field(() => POINT_TRANSACTION_STATUS_ENUM)
  status: string;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;
}
