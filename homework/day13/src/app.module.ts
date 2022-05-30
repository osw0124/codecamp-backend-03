import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { StarbucksModule } from './starbucks/starbucks.module';

@Module({
  imports: [
    StarbucksModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: false,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
      playground: true,
    }),
  ],
})
export class AppModule {}
