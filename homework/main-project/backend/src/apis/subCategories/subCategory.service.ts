import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MainCategory } from '../mainCategories/entities/mainCategory.entity';
import { SubCategory } from '../subCategories/entities/subCategory.entity';

@Injectable()
export class SubCategoryService {
  constructor(
    @InjectRepository(SubCategory)
    private readonly subCategoryRepository: Repository<SubCategory>,
    @InjectRepository(MainCategory)
    private readonly mainCategoryRepository: Repository<MainCategory>,
  ) {}

  async findOne({ subCategoryId }) {
    return await this.subCategoryRepository.findOne({
      where: { id: subCategoryId },
      relations: ['mainCategory'],
    });
  }

  async findAll() {
    return await this.subCategoryRepository.find({
      relations: ['mainCategory'],
    });
  }

  async create({ createSubCategoryInput }) {
    const { mainCategoryId, ...subCategory } = createSubCategoryInput;

    const mainCategory = await this.mainCategoryRepository.findOne({
      id: mainCategoryId,
    });

    const result = await this.subCategoryRepository.save({
      ...subCategory,
      mainCategory: {
        id: mainCategory.id,
        name: mainCategory.name,
      },
    });

    // return await this.productRepository.save({ ...createProductInput });
    return result;
  }

  async update({ subCategoryId, updateSubCategoryInput }) {
    const newSubCategory = {
      id: subCategoryId,
      ...updateSubCategoryInput,
    };
    return await this.subCategoryRepository.save(newSubCategory);
  }

  async checkSubCategory({ subCategoryId }) {
    const subCategory = await this.subCategoryRepository.findOne({
      where: { id: subCategoryId },
    });

    if (subCategory === null) {
      throw new UnprocessableEntityException('없는 카테고리입니다.');
    }
  }

  async delete({ subCategoryId }) {
    const result = await this.subCategoryRepository.softDelete({
      id: subCategoryId,
    });
    return result.affected ? true : false;
  }
  async restore({ subCategoryId }) {
    const result = await this.subCategoryRepository.restore({
      id: subCategoryId,
    });
    return result.affected ? true : false;
  }
}
