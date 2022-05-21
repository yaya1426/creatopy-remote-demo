import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-express';
import { JwtAuthGuard } from 'modules/auth/guards/jwt-auth-guard';
import {
  FAILED_TO_CREATE,
  FAILED_TO_UPDATE,
} from 'config/apollo-error-types.constants';
import { LoginSignupResult, UserType } from 'graphql/users/users.types';
import {
  LoginInput,
  ResetPasswordInput,
  SignupInput,
} from '../../graphql/users/users.inputs';
import { CurrentUser } from './users.decorator';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Mutation((returns) => LoginSignupResult)
  async login(@Args('data') data: LoginInput) {
    const result = await this.usersService.login(data);
    if (result) return result;
    throw new ApolloError('Invalid username or password');
  }

  @Mutation((returns) => LoginSignupResult)
  async signup(@Args('data') data: SignupInput) {
    const result = await this.usersService.signup(data);
    if (result) return result;
    throw new ApolloError(FAILED_TO_CREATE);
  }

  @Mutation((returns) => Boolean)
  @UseGuards(JwtAuthGuard)
  async resetPassword(
    @Args('data') resetPasswordInput: ResetPasswordInput,
    @CurrentUser() user: UserType,
  ) {
    try {
      const result = await this.usersService.resetPassword(
        resetPasswordInput,
        user,
      );
      return result;
    } catch (err) {
      throw new ApolloError(err.message, FAILED_TO_UPDATE);
    }
  }
}
