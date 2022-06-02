import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductSaleslocation } from '../productSaleslocation/entities/productSaleslocation.entity';
import { Product } from './entities/product.entity';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';

//의존성 주입 도구
@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductSaleslocation])],
  providers: [
    ProductResolver, //
    ProductService,
  ],
})
export class ProductModule {}
