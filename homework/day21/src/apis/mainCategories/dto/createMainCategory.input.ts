import { InputType, OmitType } from '@nestjs/graphql';
import { MainCategory } from '../entities/mainCategory.entity';

@InputType()
export class CreateMainCategoryInput extends OmitType(
  MainCategory,
  ['id', 'deletedAt'],
  InputType,
) {}
