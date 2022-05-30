import { Brand } from 'src/apis/brands/entities/brand.entity';
import { Color } from 'src/apis/colors/entities/color.entity';
import { Model } from 'src/apis/models/entities/model.entity';
import { SubCategory } from 'src/apis/subCategories/entities/subCategory.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  desc: string;

  @Column()
  imgUrl: string;

  @Column()
  price: number;

  @Column()
  size: string;

  @Column()
  isDeliver: boolean;

  @Column()
  star: number;

  @ManyToOne(() => SubCategory)
  subCategory: SubCategory;

  @ManyToOne(() => Brand)
  brand: Brand;

  @ManyToOne(() => Model)
  model: Model;

  @JoinTable()
  @ManyToMany(() => Color, (colors) => colors.products)
  colors: Color[];
}
