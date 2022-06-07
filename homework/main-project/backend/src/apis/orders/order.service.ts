import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async findOne({ orderId }) {
    return await this.orderRepository.findOne({
      where: { id: orderId },
      relations: ['product'],
    });
  }

  async findAll() {
    return await this.orderRepository.find({
      relations: ['product'],
    });
  }
}
