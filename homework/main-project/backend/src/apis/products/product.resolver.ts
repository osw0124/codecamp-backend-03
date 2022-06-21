import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';

import { CreateProductInput } from './dto/createProduct.input';
import { UpdateProductInput } from './dto/updateProduct.input';
import { ProductService } from './product.service';

import { Product } from './entities/product.entity';

@Resolver()
export class ProductResolver {
  constructor(
    private readonly productservice: ProductService, //
  ) {}

  @Query(() => Product)
  fetchProduct(@Args('productId') productId: string) {
    return this.productservice.findOne({ productId });
  }

  @Query(() => [Product])
  fetchProducts(@Args('search') search: string) {
    return this.productservice.findAll({ search });
  }

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    return this.productservice.create({ createProductInput });
  }

  @Mutation(() => Product)
  async updateProduct(
    @Args('productId') productId: string, //
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    await this.productservice.checkSoldout({ productId });
    return this.productservice.update({ productId, updateProductInput });
  }

  @Mutation(() => Boolean)
  deleteProduct(@Args('productId') productId: string) {
    return this.productservice.delete({ productId });
  }

  @Mutation(() => Boolean)
  restoreProduct(@Args('productId') productId: string) {
    return this.productservice.restore({ productId });
  }
}
