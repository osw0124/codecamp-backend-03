import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appService: AppService;
  let appController: AppController;

  beforeEach(() => {
    appService = new AppService(); // DI가 없기 때문에 import한 모듈을 직접 사용
    appController = new AppController(appService);
  });

  describe('getHello', () => {
    it('check return Hello World', () => {
      const result = appController.getHello();

      expect(result).toBe('Hello World!');
    });
  });
});
