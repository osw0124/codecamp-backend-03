import { Field, InputType, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';

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

  @Field(() => [String])
  colors: string[];

  @Field(() => String)
  subCategoryId: string;

  @Field(() => String)
  brandId: string;

  @Field(() => String)
  modelId: string;
}
