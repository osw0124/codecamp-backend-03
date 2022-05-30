import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class StarbucksSchema {
  @Field(() => String)
  menu: string;
  @Field(() => Int)
  price: number;
  @Field(() => Int)
  kcal: number;
  @Field(() => Int)
  saturated_fat: number;
  @Field(() => Int)
  protein: number;
  @Field(() => Int)
  salt: number;
  @Field(() => Int)
  sugar: number;
  @Field(() => Int)
  caffeine: number;
}
