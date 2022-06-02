import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ProductSaleslocation } from 'src/apis/productSaleslocation/entities/productSaleslocation.entity';
import { ProductCategory } from 'src/apis/productsCategory/entities/productCategory.entity';
import { ProductTag } from 'src/apis/productTags/entities/productTag.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  description: string;

  @Column()
  @Field(() => Int)
  price: number;

  @Column({ default: false })
  @Field(() => Boolean)
  isSoldout: boolean;

  // @Column({ default: false })
  // @Field(() => Boolean)
  // isDeleted: boolean;

  @DeleteDateColumn()
  // @Field(() => Date)
  deletedAt: Date;

  @JoinColumn()
  @OneToOne(() => ProductSaleslocation) //뭐랑 연결할지, 1:1
  @Field(() => ProductSaleslocation)
  productSalesloaction: ProductSaleslocation; //데이터 타입

  @ManyToOne(() => ProductCategory) //Many 쪽에 JoinColumn이 포함되어있어 작성하지 않아도 된다.
  @Field(() => ProductCategory)
  productCategory: ProductCategory;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @JoinTable()
  @ManyToMany(() => ProductTag, (productTags) => productTags.products)
  @Field(() => [ProductTag])
  productTags: ProductTag[];
}
