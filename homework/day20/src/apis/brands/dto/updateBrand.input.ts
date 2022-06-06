import { InputType, OmitType } from '@nestjs/graphql';
import { CreateBrandInput } from './createBrand.input';

@InputType()
export class UpdateBrandInput extends OmitType(
  CreateBrandInput,
  [],
  InputType,
) {}
