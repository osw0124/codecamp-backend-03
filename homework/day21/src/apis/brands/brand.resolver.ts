import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { BrandService } from './brand.service';
import { CreateBrandInput } from './dto/createBrand.input';
import { UpdateBrandInput } from './dto/updateBrand.input';
import { Brand } from './entities/brand.entity';

@Resolver()
export class BrandResolver {
  constructor(private readonly brandService: BrandService) {}

  @Query(() => Brand)
  fetchBrand(@Args('brandId') brandId: string) {
    return this.brandService.findOne({ brandId });
  }

  @Query(() => [Brand])
  fetchBrands() {
    return this.brandService.findAll();
  }

  @Mutation(() => Brand)
  createBrand(
    @Args('createBrandInput')
    createBrandInput: CreateBrandInput,
  ) {
    return this.brandService.create({ createBrandInput });
  }

  @Mutation(() => Brand)
  async updateBrand(
    @Args('brandId') brandId: string, //
    @Args('updateBrandInput')
    updateBrandInput: UpdateBrandInput,
  ) {
    await this.brandService.checkBrand({ brandId });
    return this.brandService.update({
      brandId,
      updateBrandInput,
    });
  }

  @Mutation(() => Boolean)
  deleteBrand(@Args('brandId') brandId: string) {
    return this.brandService.delete({ brandId });
  }

  @Mutation(() => Boolean)
  restoreBrand(@Args('brandId') brandId: string) {
    return this.brandService.restore({ brandId });
  }
}
