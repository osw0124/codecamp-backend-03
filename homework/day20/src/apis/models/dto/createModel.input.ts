import { InputType, OmitType } from '@nestjs/graphql';
import { Model } from '../entities/model.entity';

@InputType()
export class CreateModelInput extends OmitType(Model, ['id'], InputType) {}
