import { Field, InputType, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';
import { ProductSaleslocationInput } from './productSaleslocationInput';

@InputType()
export class CreateProductInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => Int)
  @Min(0) //최소값 지정
  price: number;

  @Field(() => ProductSaleslocationInput)
  productSaleslocation: ProductSaleslocationInput;

  @Field(() => String)
  productCategoryId: string;
}
