import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>( // create microservice
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: 'auth-service',
        port: 3001,
      },
    },
  );
  await app.listen();
}
bootstrap();
