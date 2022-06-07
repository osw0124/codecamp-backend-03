import { InputType } from '@nestjs/graphql';
import { CreateModelInput } from './createModel.input';

@InputType()
export class UpdateModelInput extends CreateModelInput {}
