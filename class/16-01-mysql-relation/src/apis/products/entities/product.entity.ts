import { ProductSaleslocation } from 'src/apis/productSaleslocation/entities/productSaleslocation.entity';
import { ProductCategory } from 'src/apis/productsCategory/entities/productCategory.entity';
import { ProductTag } from 'src/apis/productTags/entities/productTag.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  isSoldout: boolean;

  @JoinColumn()
  @OneToOne(() => ProductSaleslocation) //뭐랑 연결할지, 1:1
  productSalesloaction: ProductSaleslocation; //데이터 타입

  @ManyToOne(() => ProductCategory) //Many 쪽에 JoinColumn이 포함되어있어 작성하지 않아도 된다.
  productCategory: ProductCategory;

  @ManyToOne(() => User)
  user: User;

  @JoinTable()
  @ManyToMany(() => ProductTag, (productTags) => productTags.products)
  productTags: ProductTag[];
}
