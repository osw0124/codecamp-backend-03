import { Field, InputType, OmitType } from '@nestjs/graphql';
import { SubCategory } from '../entities/subCategory.entity';

@InputType()
export class CreateSubCategoryInput extends OmitType(
  SubCategory,
  ['id', 'mainCategory', 'deletedAt'],
  InputType,
) {
  @Field(() => String)
  mainCategoryId: string;
}
