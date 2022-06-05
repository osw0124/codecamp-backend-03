import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateUserInput } from './dto/createUser.input';
import { UpdateUserInput } from './dto/updateUser.input';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  fetchUser(@Args('userId') userId: string) {
    return this.userService.findOne({ userId });
  }

  @Query(() => [User])
  fetchUsers() {
    return this.userService.findAll();
  }

  @Mutation(() => User)
  createUser(
    @Args('createUserInput')
    createUserInput: CreateUserInput,
  ) {
    return this.userService.create({ createUserInput });
  }

  @Mutation(() => User)
  async updateUser(
    @Args('userId') userId: string, //
    @Args('updateUserInput')
    updateUserInput: UpdateUserInput,
  ) {
    await this.userService.checkModel({ userId });
    return this.userService.update({
      userId,
      updateUserInput,
    });
  }

  @Mutation(() => Boolean)
  deleteUser(@Args('userId') userId: string) {
    return this.userService.delete({ userId });
  }

  @Mutation(() => Boolean)
  restoreUser(@Args('userId') userId: string) {
    return this.userService.restore({ userId });
  }
}
