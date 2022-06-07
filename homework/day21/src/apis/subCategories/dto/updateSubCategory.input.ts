import { Field, InputType } from '@nestjs/graphql';
import { CreateSubCategoryInput } from './createSubCategory.input';

@InputType()
export class UpdateSubCategoryInput extends CreateSubCategoryInput {
  @Field(() => String, { nullable: true })
  mainCategoryId: string;
}
