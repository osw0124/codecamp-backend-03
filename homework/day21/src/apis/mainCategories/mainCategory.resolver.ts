import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateMainCategoryInput } from './dto/createMainCategory.input';
import { UpdateMainCategoryInput } from './dto/updateMainCategory.input';
import { MainCategory } from './entities/mainCategory.entity';
import { MainCategoryService } from './mainCategory.service';

@Resolver()
export class MainCategoryResolver {
  constructor(private readonly mainCategoryService: MainCategoryService) {}

  @Query(() => MainCategory)
  fetchMainCategory(@Args('mainCategoryId') mainCategoryId: string) {
    return this.mainCategoryService.findOne({ mainCategoryId });
  }

  @Query(() => [MainCategory])
  fetchMainCategorys() {
    return this.mainCategoryService.findAll();
  }

  @Mutation(() => MainCategory)
  createMainCategory(
    @Args('createMainCategoryInput')
    createMainCategoryInput: CreateMainCategoryInput,
  ) {
    return this.mainCategoryService.create({ createMainCategoryInput });
  }

  @Mutation(() => MainCategory)
  async updateMainCategory(
    @Args('mainCategoryId') mainCategoryId: string, //
    @Args('updateMainCategoryInput')
    updateMainCategoryInput: UpdateMainCategoryInput,
  ) {
    await this.mainCategoryService.checkMainCategory({ mainCategoryId });
    return this.mainCategoryService.update({
      mainCategoryId,
      updateMainCategoryInput,
    });
  }

  @Mutation(() => Boolean)
  deleteMainCategory(@Args('mainCategoryId') mainCategoryId: string) {
    return this.mainCategoryService.delete({ mainCategoryId });
  }

  @Mutation(() => Boolean)
  restoreMainCategory(@Args('mainCategoryId') mainCategoryId: string) {
    return this.mainCategoryService.restore({ mainCategoryId });
  }
}
