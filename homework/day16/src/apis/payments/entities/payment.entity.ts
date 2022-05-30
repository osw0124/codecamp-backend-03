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
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  price: number;

  @Column()
  amount: number;

  @Column()
  paymentDate: Date;

  @Column()
  refundLimitDate: Date;

  @ManyToOne(() => User)
  user: User;

  @JoinColumn()
  @OneToOne(() => Product)
  product: Product;
}
