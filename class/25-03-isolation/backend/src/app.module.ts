import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';

import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './apis/auth/auth.module';
import { BoardModule } from './apis/boards/boards.module';
import { PaymentMoudle } from './apis/payment/payment.module';
import { PointTransactionModule } from './apis/pointTransaction/pointTransaction.module';
import { ProductModule } from './apis/products/product.module';
import { ProductCategoryModule } from './apis/productsCategory/productCategory.module';
import { UserModule } from './apis/users/user.module';

@Module({
  imports: [
    ////////GraphQL
    BoardModule,
    ProductModule,
    ProductCategoryModule,
    UserModule,
    AuthModule,
    PaymentMoudle,
    PointTransactionModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
      context: ({ req, res }) => ({ req, res }), // graphql로 들어오는 req, res를 req, res로 사용하겠다.
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
