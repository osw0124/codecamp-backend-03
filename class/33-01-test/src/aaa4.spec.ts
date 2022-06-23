import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

class MockAppService {
  getHello(): string {
    return 'Hello World!';
  }
}

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      // nest처럼 DI를 사용하기 위해서 테스트용 모듈 생성
      controllers: [AppController],
      providers: [
        {
          provide: AppService, // 서비스 제공할 때 실제로 사용하는 서비스
          useClass: MockAppService, // 테스트용 가짜 서비스
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('getHello', () => {
    it('check return Hello World', () => {
      const result = appController.getHello();

      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
