import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      // nest처럼 DI를 사용하기 위해서 테스트용 모듈 생성
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('getHello', () => {
    it('check return Hello World', () => {
      const result = appController.getHello();

      expect(result).toBe('Hello World!');
    });
  });
});
