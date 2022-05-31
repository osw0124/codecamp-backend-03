import { Field, InputType, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';

@InputType()
export class CreateProductInput {
  @Field(() => String)
  desc: string;

  @Field(() => String)
  imgUrl: string;

  @Field(() => Int)
  price: number;

  @Field(() => String)
  size: string;

  @Field(() => Boolean)
  isDeliver: boolean;

  @Field(() => Int)
  @Min(0)
  start: number;
}
