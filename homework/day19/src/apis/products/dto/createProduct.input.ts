import { Field, InputType, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';
import { BrandInput } from 'src/apis/brands/dto/brand.input';
import { ModelInput } from 'src/apis/models/dto/model.input';
import { SubCategoryInput } from 'src/apis/subCategories/dto/subCategory.input';

@InputType()
export class CreateProductInput {
  @Field(() => String)
  desc: string;

  @Field(() => String)
  imgUrl: string;

  @Min(0)
  @Field(() => Int)
  price: number;

  @Field(() => String)
  size: string;

  @Field(() => Boolean)
  isDeliver: boolean;

  @Field(() => Int)
  @Min(0)
  star: number;

  @Min(0)
  @Field(() => Int)
  amount: number;

  @Field(() => String)
  subCategoryId: string;

  @Field(() => String)
  brandId: string;

  @Field(() => String)
  modelId: string;
}
