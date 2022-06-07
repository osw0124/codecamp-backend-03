import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Order } from 'src/apis/orders/entities/order.entity';
import { Product } from 'src/apis/products/entities/product.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => Date)
  paymentDate: Date;

  @Column()
  @Field(() => Date)
  refundLimitDate: Date;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @JoinColumn()
  @OneToOne(() => Order)
  @Field(() => Order)
  order: Order;
}
