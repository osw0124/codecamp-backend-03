import { InputType, OmitType } from '@nestjs/graphql';
import { Brand } from '../entities/brand.entity';

@InputType()
export class BrandInput extends OmitType(Brand, ['id'], InputType) {}
