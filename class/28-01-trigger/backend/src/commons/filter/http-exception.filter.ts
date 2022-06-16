import { Catch, ExceptionFilter, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException) {
    const status = exception.getStatus;
    const message = exception.message;
    const response = exception.getResponse;

    console.log('===========================================');
    console.log('에러가 발생했어요!!');
    console.log(`에러코드: ${status}`);
    console.log(`에러메세지: ${message}`);
    console.log(`에러내용: ${response}`);
    console.log('===========================================');
  }
}
