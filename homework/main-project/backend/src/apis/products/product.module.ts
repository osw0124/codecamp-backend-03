import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';

import { Brand } from '../brands/entities/brand.entity';
import { Color } from '../colors/entities/color.entity';
import { Image } from '../images/entities/image.entity';
import { Model } from '../models/entities/model.entity';
import { SubCategory } from '../subCategories/entities/subCategory.entity';
import { Product } from './entities/product.entity';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      SubCategory,
      Brand,
      Model,
      Color,
      Image,
    ]),
    ElasticsearchModule.register({ node: 'http://elasticsearch:9200' }),
  ],
  providers: [ProductResolver, ProductService],
})
export class ProductModule {}
