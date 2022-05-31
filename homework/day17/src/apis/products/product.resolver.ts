import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateProductInput } from './dto/createProduct.input';
import { UpdateProductInput } from './dto/updateProduct.input';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';

@Resolver()
export class ProductResolver {
  constructor(private readonly productservice: ProductService) {}

  @Query(() => Product)
  fetchProduct(@Args('productId') productId: string) {
    return this.productservice.findOne({ productId });
  }

  @Query(() => [Product])
  fetchProducts() {
    return this.productservice.findAll();
  }

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    return this.productservice.create({ createProductInput });
  }

  @Mutation(() => Product)
  updateProduct(
    @Args('productId') productId: string, //
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    return this.productservice.update({ productId, updateProductInput });
  }
}
