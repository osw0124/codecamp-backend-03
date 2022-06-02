import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findOne({ productId }) {
    return await this.productRepository.findOne({
      where: { id: productId },
      relations: ['subCategory', 'brand', 'model'],
    });
  }

  async findAll() {
    return await this.productRepository.find({
      relations: ['subCategory', 'brand', 'model'],
    });
  }

  async create({ createProductInput }) {
    const { subCategoryId, brandId, modelId, ...product } = createProductInput;
    const result = await this.productRepository.save({
      ...product,
      subCategory: { id: subCategoryId },
      brand: { id: brandId },
      model: { id: modelId },
    });

    console.log(result);
    console.log('===========================');
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
