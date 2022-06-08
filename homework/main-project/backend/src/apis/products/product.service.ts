import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from '../brands/entities/brand.entity';
import { Color } from '../colors/entities/color.entity';
import { MainCategory } from '../mainCategories/entities/mainCategory.entity';
import { Model } from '../models/entities/model.entity';
import { SubCategory } from '../subCategories/entities/subCategory.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(SubCategory)
    private readonly subCategoryRepository: Repository<SubCategory>,
    @InjectRepository(Brand)
    private readonly brandCategoryRepository: Repository<Brand>,
    @InjectRepository(Model)
    private readonly modelRepository: Repository<Model>,
    @InjectRepository(Color)
    private readonly colorRepository: Repository<Color>,
  ) {}

  async findOne({ productId }) {
    return await this.productRepository.findOne({
      where: { id: productId },
      relations: ['subCategory', 'brand', 'model', 'colors'],
    });
  }

  async findAll() {
    return await this.productRepository.find({
      relations: ['subCategory', 'brand', 'model', 'colors'],
    });
  }

  async create({ createProductInput }) {
    const { subCategoryId, brandId, modelId, colors, ...product } =
      createProductInput;

    const subCategory = await this.subCategoryRepository.findOne(
      {
        id: subCategoryId,
      },
      { relations: ['mainCategory'] },
    );

    const brand = await this.brandCategoryRepository.findOne({
      id: brandId,
    });
    const model = await this.modelRepository.findOne({ id: modelId });

    const inputColors = [];
    if (colors.length) {
      for (let i = 0; i < colors.length; i++) {
        const colorname = colors[i];

        const prevColor = await this.colorRepository.findOne(
          { name: colorname },
          { relations: ['products'] },
        );

        if (prevColor) {
          inputColors.push(prevColor);
        } else {
          const newColor = await this.colorRepository.save({ name: colorname });
          inputColors.push(newColor);
        }
      }
    }

    const result = await this.productRepository.save({
      ...product,
      colors: inputColors,
      subCategory: {
        id: subCategoryId,
        name: subCategory.name,
        mainCategory: {
          id: subCategory.mainCategory.id,
          name: subCategory.mainCategory.name,
        },
      },
      brand: {
        id: brandId,
        name: brand.name,
      },
      model: {
        id: modelId,
        name: model.name,
      },
    });

    // return await this.productRepository.save({ ...createProductInput });
    return result;
  }

  async update({ productId, updateProductInput }) {
    const newProduct = {
      id: productId,
      ...updateProductInput,
    };
    return await this.productRepository.save(newProduct);
  }

  async checkSoldout({ productId }) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (product.amount === 0) {
      throw new UnprocessableEntityException('매진된 상품입니다.');
    }
  }

  async delete({ productId }) {
    const result = await this.productRepository.softDelete({ id: productId });
    return result.affected ? true : false;
  }
  async restore({ productId }) {
    const result = await this.productRepository.restore({ id: productId });
    return result.affected ? true : false;
  }
}
