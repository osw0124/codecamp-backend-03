import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Order } from 'src/apis/orders/entities/order.entity';
import { Product } from 'src/apis/products/entities/product.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum POINT_TRANSACTION_STATUS_ENUM {
  PAYMENT = 'PAYMENT',
  CANCEL = 'CANCEL',
}

//enum 타입을 Field에 적용하기위한 등록
registerEnumType(POINT_TRANSACTION_STATUS_ENUM, {
  name: 'POINT_TRANSACTION_STATUS_ENUM', //이 이름으로 등록됨
});

@Entity()
@ObjectType()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  impUid: string;

  @Column()
  @Field(() => String)
  merchantUid: string;

  @Column({ nullable: false })
  @Field(() => Int)
  amount: number;

  @Column({ type: 'enum', enum: POINT_TRANSACTION_STATUS_ENUM })
  @Field(() => POINT_TRANSACTION_STATUS_ENUM)
  status: string;

  @Column({ default: 0 })
  @Field(() => Int)
  canceldAmount: number;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  // @Column()
  // @Field(() => Date)
  // refundLimitDate: Date;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @JoinColumn()
  @OneToOne(() => Order)
  @Field(() => Order)
  order: Order;
}
