import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';

import { AuthModule } from './apis/auth/auth.module';
import { BoardModule } from './apis/boards/boards.module';
import { FileModule } from './apis/file/file.module';
import { PaymentMoudle } from './apis/payment/payment.module';
import { PointTransactionModule } from './apis/pointTransaction/pointTransaction.module';
import { ProductModule } from './apis/products/product.module';
import { ProductCategoryModule } from './apis/productsCategory/productCategory.module';
import { UserModule } from './apis/users/user.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    BoardModule,
    ProductModule,
    ProductCategoryModule,
    UserModule,
    AuthModule,
    PaymentMoudle,
    PointTransactionModule,
    FileModule,
    ////////GraphQL
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
      context: ({ req, res }) => ({ req, res }), // graphql로 들어오는 req, res를 req, res로 사용하겠다.
    }),
    ///////MySQL
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.GCP_MYSQL_ADDR,
      port: 3306,
      username: process.env.GCP_MYSQL_USER,
      password: process.env.GCP_MYSQL_PASS,
      database: 'myserver03',
      entities: [__dirname + '/apis/**/*.entity.*'], //collection
      synchronize: true, //DB와 설정을 동기화 하겠다
      logging: true,
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
