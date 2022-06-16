import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Cache } from 'cache-manager';

import { BoardService } from './boards.service';
import { CreateBoardInput } from './dto/createBoard.input';

import { Board } from './entities/board.entity';

@Resolver()
export class BoardResolver {
  constructor(
    private readonly boardService: BoardService, //

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  // @Query(() => String)
  // getHello() {
  //   return this.boardService.findAll();
  // }

  @Query(() => [Board]) //스키마
  fetchBoards() {
    return this.boardService.findAll();
  }

  @Mutation(() => String)
  async createBoard(
    //값을 받아온다.
    @Args({ name: 'writer', nullable: true }) writer: string,
    @Args('title') title: string,
    @Args('contents') contents: string,
    @Args('createBoardInput') createBoardInput: CreateBoardInput,
  ) {
    // 1. 캐시에 등록하는 연습
    await this.cacheManager.set('aaa', createBoardInput, {
      ttl: 0, // 영구 저장
    });

    // 2. 캐시에 조회하는 연습
    const mycache = await this.cacheManager.get('aaa');
    console.log(mycache);

    return '레디스 캐시 테스트 중';
    ///////////////////////////////////////////////////////////////
    //레디스 테스트를 위해서 잠시 주석
    // console.log(writer);
    // console.log(title);
    // console.log(contents);
    // console.log(createBoardInput);
    // return this.boardService.create();
  }
}
