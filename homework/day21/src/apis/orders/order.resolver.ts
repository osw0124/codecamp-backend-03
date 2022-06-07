import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Order } from './entities/order.entity';
import { OrderService } from './order.service';

@Resolver()
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Query(() => Order)
  fetchOrder(@Args('orderId') orderId: string) {
    return this.orderService.findOne({ orderId });
  }

  @Query(() => [Order])
  fetchBrands() {
    return this.orderService.findAll();
  }
}
