import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';

import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './apis/auth/auth.module';
import { BrandModule } from './apis/brands/brand.module';
import { IamportModule } from './apis/iamport/iamport.module';
import { MainCategoryModule } from './apis/mainCategories/mainCategory.module';
import { ModelModule } from './apis/models/model.module';
import { OrderModule } from './apis/orders/order.module';
import { PaymentModule } from './apis/payments/payment.module';
import { ProductModule } from './apis/products/product.module';
import { SubCategoryModule } from './apis/subCategories/subCategory.module';
import { UserModule } from './apis/users/user.module';
@Module({
  imports: [
    ProductModule,
    SubCategoryModule,
    MainCategoryModule,
    ModelModule,
    UserModule,
    BrandModule,
    OrderModule,
    AuthModule,
    PaymentModule,
    IamportModule,
    ////////GraphQL
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
      context: ({ req, res }) => ({ req, res }),
    }),
    ///////MySQL
    TypeOrmModule.forRoot({
      type: 'mysql',
      // host: 'my_database',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '12341234',
      database: 'day17',
      entities: [__dirname + '/apis/**/*.entity.*'], //collection
      synchronize: true, //DB와 설정을 동기화 하겠다
      logging: true,
    }),
  ],
})
export class AppModule {}

// volumes:
//       - './init/:/docker-entrypoint-initdb.d/'
