import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BoardService } from './boards.service';
import { CreateBoardInput } from './dto/createBoard.input';
import { Board } from './entities/board.entity';

@Resolver()
export class BoardResolver {
  constructor(private readonly boardService: BoardService) {}

  // @Query(() => String)
  // getHello() {
  //   return this.boardService.findAll();
  // }

  @Query(() => [Board]) //스키마
  fetchBoards() {
    return this.boardService.findAll();
  }

  @Mutation(() => String)
  createBoard(
    //값을 받아온다.
    @Args({ name: 'writer', nullable: true }) writer: string,
    @Args('title') title: string,
    @Args('contents') contents: string,
    @Args('createBoardInput') createBoardInput: CreateBoardInput,
  ) {
    console.log(writer);
    console.log(title);
    console.log(contents);
    console.log(createBoardInput);
    return this.boardService.create();
  }
}
