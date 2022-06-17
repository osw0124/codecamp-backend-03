import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateProductInput } from './dto/createProduct.input';
import { UpdateProductInput } from './dto/updateProduct.input';
import { ProductService } from './product.service';

import { Product } from './entities/product.entity';

@Resolver()
export class ProductResolver {
  constructor(
    private readonly productService: ProductService,
    private readonly elasticsearchService: ElasticsearchService,
  ) {}

  @Query(() => [Product])
  async fetchProducts() {
    // 엘라스틱!!
    const result = await this.elasticsearchService.search({
      index: 'myproduct03', // 검색 대상
      query: {
        //검색 조건
        match_all: {},
      },
    });

    console.log(JSON.stringify(result, null, ' '));

    // 엘라스틱 연습 위해 주석
    // return this.productService.findAll();
  }

  @Query(() => Product)
  fetchProduct(
    @Args('productId') productId: string, //
  ) {
    return this.productService.findOne({ productId });
  }

  @Mutation(() => Product) //entity
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput, //
  ) {
    //엘라스틱!!
    this.elasticsearchService.create({
      id: 'myid',
      index: 'myproduct03', // collection과 같다 -> database
      document: {
        // name: '철수',
        // age: 13,
        // school: '다람쥐 초등학교',
        ...createProductInput,
      },
    });

    // //DB 카테고리 등록, 클라이언트 응답, 엘라스틱 연습 위해서 임시 주석
    // return this.productService.create({ createProductInput });
  }

  @Mutation(() => Product)
  async updateProduct(
    @Args('productId') productId: string,
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    //판매 완료 되었는지 확인해보기
    await this.productService.checkSoldout({ productId });

    //수정하기
    return await this.productService.update({ productId, updateProductInput });
  }

  @Mutation(() => Boolean)
  deleteProduct(@Args('productId') productId: string) {
    return this.productService.delete({ productId });
  }
}
