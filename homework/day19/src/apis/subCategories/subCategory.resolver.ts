import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateSubCategoryInput } from './dto/createSubCategory.input';
import { UpdateSubCategoryInput } from './dto/updateSubCategory.input';
import { SubCategory } from './entities/subCategory.entity';
import { SubCategoryService } from './subCategory.service';

@Resolver()
export class SubCategoryResolver {
  constructor(private readonly subCategoryservice: SubCategoryService) {}

  @Query(() => SubCategory)
  fetchSubCategory(@Args('subCategoryId') subCategoryId: string) {
    return this.subCategoryservice.findOne({ subCategoryId });
  }

  @Query(() => [SubCategory])
  fetchSubCategorys() {
    return this.subCategoryservice.findAll();
  }

  @Mutation(() => SubCategory)
  createSubCategory(
    @Args('createSubCategoryInput')
    createSubCategoryInput: CreateSubCategoryInput,
  ) {
    return this.subCategoryservice.create({ createSubCategoryInput });
  }

  @Mutation(() => SubCategory)
  async updateSubCategory(
    @Args('subCategoryId') subCategoryId: string, //
    @Args('createSubCategoryInput')
    updateSubCategoryInput: UpdateSubCategoryInput,
  ) {
    await this.subCategoryservice.checkSubCategory({ subCategoryId });
    return this.subCategoryservice.update({
      subCategoryId,
      updateSubCategoryInput,
    });
  }

  @Mutation(() => Boolean)
  deleteSubCategory(@Args('subCategoryId') subCategoryId: string) {
    return this.subCategoryservice.delete({ subCategoryId });
  }

  @Mutation(() => Boolean)
  restoreSubCategory(@Args('subCategoryId') subCategoryId: string) {
    return this.subCategoryservice.restore({ subCategoryId });
  }
}
