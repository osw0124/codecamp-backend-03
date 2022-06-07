import { InputType, OmitType } from '@nestjs/graphql';
import { CreateUserInput } from './createUser.input';

@InputType()
export class UpdateUserInput extends OmitType(
  CreateUserInput,
  ['password'],
  InputType,
) {}
