import { Module } from '@nestjs/common';
import { StarbucksService } from './starbuck.service';
import { StarbucksResolver } from './starbucks.resolver';

@Module({
  providers: [StarbucksResolver, StarbucksService],
})
export class StarbucksModule {}
