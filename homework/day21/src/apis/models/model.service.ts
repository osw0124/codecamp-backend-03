import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Model } from './entities/model.entity';

@Injectable()
export class ModelService {
  constructor(
    @InjectRepository(Model)
    private readonly modelRepository: Repository<Model>,
  ) {}

  async findOne({ modelId }) {
    return await this.modelRepository.findOne({
      where: { id: modelId },
    });
  }

  async findAll() {
    return await this.modelRepository.find();
  }

  async create({ createModelInput }) {
    const { ...model } = createModelInput;

    const result = await this.modelRepository.save({
      ...model,
    });

    console.log(result);
    console.log('===========================');
    // return await this.productRepository.save({ ...createProductInput });
    return result;
  }

  async update({ modelId, updateModelInput }) {
    const newModel = {
      id: modelId,
      ...updateModelInput,
    };
    return await this.modelRepository.save(newModel);
  }

  async checkModel({ modelId }) {
    const model = await this.modelRepository.findOne({
      where: { id: modelId },
    });

    if (model === null) {
      throw new UnprocessableEntityException('없는 모델입니다.');
    }
  }

  async delete({ modelId }) {
    const result = await this.modelRepository.softDelete({
      id: modelId,
    });
    return result.affected ? true : false;
  }
  async restore({ modelId }) {
    const result = await this.modelRepository.restore({
      id: modelId,
    });
    return result.affected ? true : false;
  }
}
