import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
  ) {}

  async findOne({ brandId }) {
    return await this.brandRepository.findOne({
      where: { id: brandId },
    });
  }

  async findAll() {
    return await this.brandRepository.find();
  }

  async create({ createBrandInput }) {
    const { ...brand } = createBrandInput;

    const result = await this.brandRepository.save({
      ...brand,
    });

    return result;
  }

  async update({ brandId, updateBrandInput }) {
    const newBrand = {
      id: brandId,
      ...updateBrandInput,
    };
    return await this.brandRepository.save(newBrand);
  }

  async checkBrand({ brandId }) {
    const brand = await this.brandRepository.findOne({
      where: { id: brandId },
    });

    if (brand === null) {
      throw new UnprocessableEntityException('없는 브랜드입니다.');
    }
  }

  async delete({ brandId }) {
    const result = await this.brandRepository.softDelete({
      id: brandId,
    });
    return result.affected ? true : false;
  }
  async restore({ brandId }) {
    const result = await this.brandRepository.restore({
      id: brandId,
    });
    return result.affected ? true : false;
  }
}
