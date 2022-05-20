import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-express';
import { LoginResult } from 'graphql/users/users.types';
import { LoginInput } from '../graphql/users/users.inputs';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Mutation((returns) => LoginResult)
  async login(@Args('data') data: LoginInput): Promise<LoginResult> {
    const result = await this.usersService.login(data);
    if (result) return result;
    throw new ApolloError('Invalid username or password');
  }
}
