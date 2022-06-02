import { InputType, OmitType } from '@nestjs/graphql';
import { SubCategory } from '../entities/subCategory.entity';

@InputType()
export class SubCategoryInput extends OmitType(
  SubCategory,
  ['id', 'mainCategory'],
  InputType,
) {}
