import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateStarbucksInput } from './dto/createStarbucks.input';
import { StarbucksSchema } from './entities/starbucks.entity';
import { StarbucksService } from './starbuck.service';

@Resolver()
export class StarbucksResolver {
  constructor(private readonly starbucksService: StarbucksService) {}
  @Query(() => [StarbucksSchema])
  fetchStarbucks() {
    return this.starbucksService.fetchMenu();
  }

  @Mutation(() => String)
  createStarbucks(
    @Args('createStarbucksInput') createStarbucksInput: CreateStarbucksInput,
  ) {
    console.log(createStarbucksInput);
    return this.starbucksService.createMenu();
  }
}
