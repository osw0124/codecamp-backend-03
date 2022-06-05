import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOne({ userId }) {
    return await this.userRepository.findOne({
      where: { id: userId },
    });
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async create({ createUserInput }) {
    const { ...user } = createUserInput;

    const hasUser = await this.userRepository.findOne({ name: user.name });

    if (hasUser) {
      return new ConflictException('이미 가입된 사용자입니다.');
    }

    const result = await this.userRepository.save({
      ...user,
    });

    console.log(result);
    console.log('===========================');
    // return await this.productRepository.save({ ...createProductInput });
    return result;
  }

  async update({ userId, updateUserInput }) {
    const newUser = {
      id: userId,
      ...updateUserInput,
    };
    return await this.userRepository.save(newUser);
  }

  async checkModel({ userId }) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (user === null) {
      throw new UnprocessableEntityException('없는 사용자입니다.');
    }
  }

  async delete({ userId }) {
    const result = await this.userRepository.softDelete({
      id: userId,
    });
    return result.affected ? true : false;
  }
  async restore({ userId }) {
    const result = await this.userRepository.restore({
      id: userId,
    });
    return result.affected ? true : false;
  }
}
