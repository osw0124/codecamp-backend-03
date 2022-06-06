import { InputType, OmitType } from '@nestjs/graphql';
import { Brand } from '../entities/brand.entity';

@InputType()
export class CreateBrandInput extends OmitType(Brand, ['id'], InputType) {}
