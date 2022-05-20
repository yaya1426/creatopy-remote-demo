import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-express';
import { FAILED_TO_CREATE } from 'config/apollo-error-types.constants';
import { LoginResult, UserType } from 'graphql/users/users.types';
import { LoginInput, SignupInput } from '../../graphql/users/users.inputs';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Mutation((returns) => LoginResult)
  async login(@Args('data') data: LoginInput) {
    const result = await this.usersService.login(data);
    if (result) return result;
    throw new ApolloError('Invalid username or password');
  }

  @Mutation((returns) => UserType)
  async signup(@Args('data') data: SignupInput) {
    const result = await this.usersService.signup(data);
    if (result) return result;
    throw new ApolloError(FAILED_TO_CREATE);
  }
}
