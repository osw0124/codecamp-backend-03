import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOne({ email }) {
    return await this.userRepository.findOne({
      where: { email: email },
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

    const hashedPassword = await bcrypt.hash(user.password, 7);

    const result = await this.userRepository.save({
      name: user.name,
      birthDay: user.birthDay,
      phoneNumber: user.phoneNumber,
      email: user.email,
      password: hashedPassword,
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

  async hasUser({ email }) {
    const user = await this.userRepository.findOne({ email: email });

    if (user === null) {
      throw new UnprocessableEntityException('없는 사용자입니다.');
    }
    return user;
  }

  async updateUserPwd({ email, changePassword }) {
    const hashedPassword = await bcrypt.hash(changePassword, 7);
    await this.userRepository.update(
      { email: email },
      { password: hashedPassword },
    );
    return true;
  }

  async findLoginUser() {
    return await this.userRepository.findOne({ isLogin: true });
  }

  async deleteLoginUser({ email }) {
    const result = await this.userRepository.delete({
      email: email,
      isLogin: true,
    });

    return true;
  }
}
