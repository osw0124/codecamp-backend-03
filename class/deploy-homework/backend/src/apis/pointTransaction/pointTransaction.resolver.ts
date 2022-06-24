import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth-guards';

import { PointTransactionService } from './pointTransaction.service';
import { CurrentUser, ICurrentUser } from 'src/commons/auth/gql-user.param';

import { PointTransaction } from './entities/pointTransaction.entity';

@Resolver()
export class PointTransactionResolver {
  constructor(
    private readonly pointTransactionService: PointTransactionService, //
  ) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => PointTransaction)
  createPointTransaction(
    @Args('impUid') impUid: string, //
    @Args('amount') amount: number,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    return this.pointTransactionService.create({ impUid, amount, currentUser });
  }
}
