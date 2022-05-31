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
    return await this.productRepository.findOne({ where: { id: productId } });
  }

  async findAll() {
    return await this.productRepository.find();
  }

  async create({ createProductInput }) {
    return await this.productRepository.save({ ...createProductInput });
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
}
