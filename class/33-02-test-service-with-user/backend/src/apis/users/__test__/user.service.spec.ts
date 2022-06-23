import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConflictException } from '@nestjs/common';

// import { UserResolver } from '../user.resolver';
import { UserService } from '../user.service';

import { User } from '../entities/user.entity';

class MockUserRepository {
  mockDB = [{ email: 'fdsfe@test.com', password: 'lsdjf33ljlj', name: '세웅02', age: 27 }];

  findOne({ email }) {
    const users = this.mockDB.filter((el) => el.email === email);
    if (users.length) return users[0];
    return null;
  }

  save({ email, password, name, age }) {
    this.mockDB.push({ email, password, name, age });
    return this.mockDB[this.mockDB.length - 1];
  }
}

describe('userService', () => {
  let userService: UserService;

  beforeEach(async () => {
    const userModule: TestingModule = await Test.createTestingModule({
      // 여기는 왜 TestingModule을 사용하지 않는가?
      providers: [
        // UserResolver,
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: MockUserRepository,
        },
      ],
    }).compile();

    userService = userModule.get<UserService>(UserService);
  });

  describe('create', () => {
    it('이미 존재하는 이메일 검증하기!!', async () => {
      const myData = {
        email: 'test@test.com',
        hashedPassword: 'jk2231jnk',
        name: '세웅',
        age: 28,
      };

      try {
        await userService.create({ ...myData });
      } catch (error) {
        expect(error).toBe(ConflictException);
      }
    });

    it('회원 등록 잘됐는지 검증!!', async () => {
      const myData = {
        email: 'bbb@test.com',
        hashedPassword: 'jk2231jnk',
        name: '세웅',
        age: 28,
      };
      const myResultData = {
        email: 'bbb@test.com',
        password: 'jk2231jnk',
        name: '세웅',
        age: 28,
      };

      const result = await userService.create({ ...myData });
      expect(result).toStrictEqual(myResultData); // 객체나 배열을 비교할 때는 toStrictequal을 사용한다.
    });
  });

  describe('findOne', () => {});
});
