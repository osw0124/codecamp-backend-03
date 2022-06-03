import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateModelInput } from './dto/createModel.input';
import { Model } from './entities/model.entity';
import { ModelService } from './model.service';

@Resolver()
export class ModelResolver {
  constructor(private readonly modelService: ModelService) {}

  @Query(() => Model)
  fetchModel(@Args('modelId') modelId: string) {
    return this.modelService.findOne({ modelId });
  }

  @Query(() => [Model])
  fetchModels() {
    return this.modelService.findAll();
  }

  @Mutation(() => Model)
  createModel(
    @Args('createModelInput')
    createModelInput: CreateModelInput,
  ) {
    return this.modelService.create({ createModelInput });
  }

  @Mutation(() => Model)
  async updateModel(
    @Args('mainCategoryId') mainCategoryId: string, //
    @Args('updateMainCategoryInput')
    updateMainCategoryInput: UpdateMainCategoryInput,
  ) {
    await this.modelService.checkMainCategory({ mainCategoryId });
    return this.modelService.update({
      mainCategoryId,
      updateMainCategoryInput,
    });
  }

  @Mutation(() => Boolean)
  deleteMainCategory(@Args('mainCategoryId') mainCategoryId: string) {
    return this.modelService.delete({ mainCategoryId });
  }

  @Mutation(() => Boolean)
  restoreMainCategory(@Args('mainCategoryId') mainCategoryId: string) {
    return this.modelService.restore({ mainCategoryId });
  }
}
