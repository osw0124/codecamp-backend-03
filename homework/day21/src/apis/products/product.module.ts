import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from '../brands/entities/brand.entity';
import { Color } from '../colors/entities/color.entity';
import { Model } from '../models/entities/model.entity';
import { SubCategory } from '../subCategories/entities/subCategory.entity';
import { Product } from './entities/product.entity';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, SubCategory, Brand, Model, Color]),
  ],
  providers: [ProductResolver, ProductService],
})
export class ProductModule {}
