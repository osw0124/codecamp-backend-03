import { InputType, OmitType } from '@nestjs/graphql';
import { Order } from '../order.entity';

@InputType()
export class OrderInput extends OmitType(Order, ['id'], InputType) {}
