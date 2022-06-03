import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MainCategory } from '../mainCategories/entities/mainCategory.entity';

@Injectable()
export class ModelService {
  constructor(
    @InjectRepository(MainCategory)
    private readonly mainCategoryRepository: Repository<MainCategory>,
  ) {}

  async findOne({ modelId }) {
    return await this.mainCategoryRepository.findOne({
      where: { id: modelId },
    });
  }

  async findAll() {
    return await this.mainCategoryRepository.find();
  }

  async create({ createModelInput }) {
    const { ...model } = createModelInput;

    const result = await this.mainCategoryRepository.save({
      ...model,
    });

    console.log(result);
    console.log('===========================');
    // return await this.productRepository.save({ ...createProductInput });
    return result;
  }

  async update({ mainCategoryId, updateMainCategoryInput }) {
    const newMainCategory = {
      id: mainCategoryId,
      ...updateMainCategoryInput,
    };
    return await this.mainCategoryRepository.save(newMainCategory);
  }

  async checkMainCategory({ mainCategoryId }) {
    const mainCategory = await this.mainCategoryRepository.findOne({
      where: { id: mainCategoryId },
    });

    if (mainCategory === null) {
      throw new UnprocessableEntityException('없는 카테고리입니다.');
    }
  }

  async delete({ mainCategoryId }) {
    const result = await this.mainCategoryRepository.softDelete({
      id: mainCategoryId,
    });
    return result.affected ? true : false;
  }
  async restore({ mainCategoryId }) {
    const result = await this.mainCategoryRepository.restore({
      id: mainCategoryId,
    });
    return result.affected ? true : false;
  }
}
