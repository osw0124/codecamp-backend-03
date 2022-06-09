import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth-guards';

import { PaymentService } from './payment.service';
import { CurrentUser, ICurrentUser } from 'src/commons/auth/gql-user-param';

import { Payment } from './entities/payment.entity';

@Resolver()
export class PaymentResolver {
  constructor(
    private readonly paymentService: PaymentService, //
  ) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Payment)
  createPayment(
    @Args('impUid') impUid: string, //
    @Args('amount') amount: number,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    console.log('들어옵~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    return this.paymentService.create({ impUid, amount, currentUser });
  }
}
