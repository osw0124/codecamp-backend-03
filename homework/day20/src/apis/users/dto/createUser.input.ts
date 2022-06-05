import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  name: string;

  @Field(() => Date)
  birthDay: Date;

  @Field(() => String)
  phoneNumber: string;

  @Field(() => String)
  email: string;

  @Field(() => String, { nullable: false })
  password: string;
}
