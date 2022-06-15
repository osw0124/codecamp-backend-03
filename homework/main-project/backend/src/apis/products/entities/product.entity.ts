import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Min } from 'class-validator';
import { Brand } from 'src/apis/brands/entities/brand.entity';
import { Color } from 'src/apis/colors/entities/color.entity';
import { Image } from 'src/apis/images/entities/image.entity';
import { Model } from 'src/apis/models/entities/model.entity';
import { SubCategory } from 'src/apis/subCategories/entities/subCategory.entity';
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
  desc: string;

  @Column()
  @Field(() => Int)
  price: number;

  @Column()
  @Field(() => String)
  size: string;

  @Column({ default: false })
  @Field(() => Boolean, { defaultValue: false })
  isDeliver: boolean;

  @Column({ default: 0 })
  @Field(() => Int, { defaultValue: 0 })
  star: number;

  @Column({ default: 0 })
  @Field(() => Int, { defaultValue: 0 })
  amount: number;

  @DeleteDateColumn()
  deletedAt: Date;

  @JoinTable()
  @ManyToMany(() => Image, (image) => image.product)
  @Field(() => [Image])
  imgUrl: Image[];

  @ManyToOne(() => SubCategory)
  @Field(() => SubCategory)
  subCategory: SubCategory;

  @ManyToOne(() => Brand)
  @Field(() => Brand)
  brand: Brand;

  @ManyToOne(() => Model)
  @Field(() => Model)
  model: Model;

  @JoinTable()
  @ManyToMany(() => Color, (colors) => colors.products)
  @Field(() => [Color])
  colors: Color[];
}
