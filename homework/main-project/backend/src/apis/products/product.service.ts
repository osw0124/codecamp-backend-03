import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { ElasticsearchService } from '@nestjs/elasticsearch';

import { Brand } from '../brands/entities/brand.entity';
import { Color } from '../colors/entities/color.entity';
import { Image } from '../images/entities/image.entity';
import { MainCategory } from '../mainCategories/entities/mainCategory.entity';
import { Model } from '../models/entities/model.entity';
import { SubCategory } from '../subCategories/entities/subCategory.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cachemanager: Cache,
    private readonly elasticsearchService: ElasticsearchService,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(SubCategory)
    private readonly subCategoryRepository: Repository<SubCategory>,
    @InjectRepository(Brand)
    private readonly brandCategoryRepository: Repository<Brand>,
    @InjectRepository(Model)
    private readonly modelRepository: Repository<Model>,
    @InjectRepository(Color)
    private readonly colorRepository: Repository<Color>,
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}

  async findOne({ productId }) {
    return await this.productRepository.findOne({
      where: { id: productId },
      relations: ['subCategory', 'brand', 'model', 'colors'],
    });
  }

  async findAll({ search }) {
    // 1. Redis에 해당 검색어에 대한 검색결과가 캐시되어 있는지 확인합니다.
    const hasToken = await this.cachemanager.get(search);

    // 2. 있으면 캐시되어있는 결과를 클라이언트에 반환합니다.
    if (hasToken) {
      return hasToken;
    }

    // 3. 없다면 Elasticsearch에서 해당 검색어를 검색합니다.
    const hasElastic = await this.elasticsearchService.search({
      index: 'day17',
      query: {
        match_all: { _name: search },
      },
    });

    const idArr = hasElastic.hits.hits.map((v) => v._source['id']);
    const result = await this.productRepository.findByIds(idArr, {
      relations: ['subCategory', 'brand', 'model', 'colors'],
    });

    // 4. 조회한  결과를 Redis에 저장
    for (let i = 0; i < result.length; i++) {
      await this.cachemanager.set(`${result[i].id}`, result[i], { ttl: 600 });
    }

    //5. 조회한 결과를 클라이언트에게 반환
    return result;

    // DB 조회 주석 처리
    // return await this.productRepository.find({
    //   relations: ['subCategory', 'brand', 'model', 'colors'],
    // });
  }

  async create({ createProductInput }) {
    const { subCategoryId, brandId, modelId, colors, imgUrl, ...product } =
      createProductInput;

    const subCategory = await this.subCategoryRepository.findOne(
      {
        id: subCategoryId,
      },
      { relations: ['mainCategory'] },
    );

    const brand = await this.brandCategoryRepository.findOne({
      id: brandId,
    });
    const model = await this.modelRepository.findOne({ id: modelId });

    //색상 입력
    const inputColors = [];
    if (colors.length) {
      for (let i = 0; i < colors.length; i++) {
        const colorname = colors[i];

        const prevColor = await this.colorRepository.findOne(
          { name: colorname },
          { relations: ['products'] },
        );

        if (prevColor) {
          inputColors.push(prevColor);
        } else {
          const newColor = await this.colorRepository.save({ name: colorname });
          inputColors.push(newColor);
        }
      }
    }

    //이미지 입력
    const inputImages = [];
    if (imgUrl.length) {
      for (let i = 0; i < imgUrl.length; i++) {
        const img = imgUrl[i];

        const prevImage = await this.imageRepository.findOne(
          { url: img },
          { relations: ['product'] },
        );

        if (prevImage) {
          inputImages.push(prevImage);
        } else {
          const newImage = await this.imageRepository.save({ url: img });
          inputImages.push(newImage);
        }
      }
    }

    const result = await this.productRepository.save({
      ...product,
      imgUrl: inputImages,
      colors: inputColors,
      subCategory: {
        id: subCategoryId,
        name: subCategory.name,
        mainCategory: {
          id: subCategory.mainCategory.id,
          name: subCategory.mainCategory.name,
        },
      },
      brand: {
        id: brandId,
        name: brand.name,
      },
      model: {
        id: modelId,
        name: model.name,
      },
    });

    // return await this.productRepository.save({ ...createProductInput });
    return result;
  }

  async update({ productId, updateProductInput }) {
    const product = await this.productRepository.findOne(
      { id: productId },
      { relations: ['colors', 'subCategory', 'brand', 'model'] },
    );

    // const subCategory = await this.subCategoryRepository.findOne({id: })
    const newProduct = {
      id: productId,
      ...product,
      ...updateProductInput,
      subCategory: {
        id: product.subCategory.id,
        name: product.subCategory.name,
      },
      brand: {
        id: product.brand.id,
        name: product.brand.name,
      },
      model: {
        id: product.model.id,
        name: product.model.name,
      },
    };
    // console.log('========================', newProduct);

    const result = await this.productRepository.save(newProduct);
    console.log(result);

    return result;
  }

  async checkSoldout({ productId }) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (product.amount === 0) {
      throw new UnprocessableEntityException('매진된 상품입니다.');
    }
  }

  async delete({ productId }) {
    const result = await this.productRepository.softDelete({ id: productId });
    return result.affected ? true : false;
  }
  async restore({ productId }) {
    const result = await this.productRepository.restore({ id: productId });
    return result.affected ? true : false;
  }
}
