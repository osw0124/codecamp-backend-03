import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Min } from 'class-validator';
import { Product } from 'src/apis/products/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Min(0)
  @Column({ default: 0 })
  @Field(() => Int, { defaultValue: 0 })
  amount: number;

  @Min(0)
  @Column({ default: 0 })
  @Field(() => Int, { defaultValue: 0 })
  price: number;

  @JoinColumn()
  @OneToOne(() => Product)
  @Field(() => Product)
  product: Product;
}
