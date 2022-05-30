import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardModule } from './apis/boards/boards.module';

@Module({
  imports: [
    ////////GraphQL
    BoardModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schma.gql',
    }),
    ///////MySQL
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '12341234',
      database: 'myproject03',
      entities: [__dirname + '/apis/**/*.entity.*'], //collection
      synchronize: true, //DB와 설정을 동기화 하겠다
      logging: true,
    }),
  ],
})
export class AppModule {}
