import { InputType, OmitType } from '@nestjs/graphql';
import { ProductSaleslocation } from 'src/apis/productSaleslocation/entities/productSaleslocation.entity';

@InputType()
export class ProductSaleslocationInput extends OmitType(ProductSaleslocation, ['id'], InputType) {}
