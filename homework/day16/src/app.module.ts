import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '12341234',
      database: 'day16',
      entities: [__dirname + '/apis/**/*.entity.*'], //collection
      synchronize: true, //DB와 설정을 동기화 하겠다
      logging: true,
    }),
  ],
})
export class AppModule {}

// volumes:
//       - './init/:/docker-entrypoint-initdb.d/'
