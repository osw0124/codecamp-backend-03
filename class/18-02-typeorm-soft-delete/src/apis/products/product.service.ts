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

  async create({ createProductInput }) {
    // const result = await this.productRepository.save({
    //   name: createProductInput.name,
    //   description: createProductInput.description,
    //   price: createProductInput.price,
    // });

    const result = await this.productRepository.save({ ...createProductInput });

    return result;
  }

  async update({ productId, updateProductInput }) {
    const myproduct = await this.productRepository.findOne({ where: { id: productId } });

    const newProduct = {
      ...myproduct,
      id: productId,
      ...updateProductInput,
    };

    return await this.productRepository.save(newProduct);
  }

  async delete({ productId }) {
    // 실제 삭제
    // const result = await this.productRepository.delete({ id: productId });
    // return result.affected ? true : false;

    //소프트 삭제(직접구현) - isDeleted
    // this.productRepository.update({ id: productId }, { isDeleted: true });

    //소프트 삭제(직접구현) - deletedAt
    // this.productRepository.update({ id: productId }, { deletedAt: new Date() });

    //소프트 삭제(TypeORM) - softRemove - 아이디로만 삭제 가능
    // this.productRepository.softRemove({ id: productId });

    //소프트 삭제(TypeORM) - softDelete -  다른 조건으로도 삭제 가능
    const result = await this.productRepository.softDelete({ id: productId });
    return result.affected ? true : false;
  }

  async findAll() {
    return await this.productRepository.find();
  }

  async findOne({ productId }) {
    return await this.productRepository.findOne({ where: { id: productId } });
  }

  async checkSoldout({ productId }) {
    // exception filter로 대체 가능
    // try {
    // } catch (error) {
    //   console.log(error); // sentry.io?
    // } finally {
    //   // 무조건 실행
    // }

    const product = await this.productRepository.findOne({ where: { id: productId } });

    if (product.isSoldout) {
      throw new UnprocessableEntityException('이미 판매 완료된 상품입니다!!');
    }

    // if (product.isSoldout) {
    //   throw new HttpException(
    //     '이미 판매 완료된 상품입니다!!', //
    //     HttpStatus.CONFLICT, // 409
    //   );
    // }
  }
}
