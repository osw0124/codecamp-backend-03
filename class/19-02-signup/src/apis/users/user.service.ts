import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserSerive {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create({ email, password, name, age }) {
    const user = await this.userRepository.findOne({ email });
    if (user) {
      throw new ConflictException('중복된 이메일입니다.');
    }
    return await this.userRepository.save({ email, password, name, age });
  }
}
