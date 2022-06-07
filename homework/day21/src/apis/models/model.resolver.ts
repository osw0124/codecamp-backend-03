import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateModelInput } from './dto/createModel.input';
import { UpdateModelInput } from './dto/updateModel.input';
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
    @Args('modelId') modelId: string, //
    @Args('updateModelInput')
    updateModelInput: UpdateModelInput,
  ) {
    await this.modelService.checkModel({ modelId });
    return this.modelService.update({
      modelId,
      updateModelInput,
    });
  }

  @Mutation(() => Boolean)
  deleteModel(@Args('modelId') modelId: string) {
    return this.modelService.delete({ modelId });
  }

  @Mutation(() => Boolean)
  restoreModel(@Args('modelId') modelId: string) {
    return this.modelService.restore({ modelId });
  }
}
