import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MainCategory } from '../mainCategories/entities/mainCategory.entity';
import { SubCategory } from '../subCategories/entities/subCategory.entity';
import { SubCategoryResolver } from './subCategory.resolver';
import { SubCategoryService } from './subCategory.service';

@Module({
  imports: [TypeOrmModule.forFeature([SubCategory, MainCategory])],
  providers: [SubCategoryResolver, SubCategoryService],
})
export class SubCategoryModule {}
