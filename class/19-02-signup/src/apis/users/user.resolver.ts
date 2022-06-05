import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserSerive } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserSerive) {}

  @Query(() => User)
  fetchUser() {}

  @Query(() => [User])
  fetchUsers() {}

  @Mutation(() => User)
  createUser(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('name') name: string,
    @Args('age') age: number,
  ) {
    return this.userService.create({ email, password, name, age });
  }
}
