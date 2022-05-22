import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-express';
import { JwtAuthGuard } from 'modules/auth/guards/jwt-auth-guard';
import { LoginSignupResult, UserType } from 'graphql/users/users.types';
import {
  LoginInput,
  ResetPasswordInput,
  SignupInput,
  VerifyUserInput,
} from 'graphql/users/users.inputs';
import { CurrentUser } from './users.decorator';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Mutation((returns) => UserType)
  async findUser(@Args('username') username: string) {
    try {
      const findUser = await this.usersService.findOneByUsername(username);
      if (findUser) {
        return findUser;
      }
      throw new ApolloError('Username does not exist');
    } catch (err) {
      throw new ApolloError(err.message);
    }
  }

  @Mutation((returns) => LoginSignupResult)
  async login(@Args('data') data: LoginInput) {
    try {
      const result = await this.usersService.login(data);
      if (result) return result;
      throw new ApolloError('Invalid username or password');
    } catch (err) {
      throw new ApolloError(err.message);
    }
  }

  @Mutation((returns) => LoginSignupResult)
  async signup(@Args('data') data: SignupInput) {
    try {
      const result = await this.usersService.signup(data);
      if (result) return result;
      throw new ApolloError('Cannot create a new user at the moment.');
    } catch (err) {
      throw new ApolloError(err.message);
    }
  }

  @Mutation((returns) => Boolean)
  async verifyUser(@Args('data') data: VerifyUserInput) {
    try {
      return await this.usersService.verifyUser(data);
    } catch (err) {
      throw new ApolloError(err.message);
    }
  }

  @Mutation((returns) => Boolean)
  async resetPassword(@Args('data') resetPasswordInput: ResetPasswordInput) {
    try {
      const result = await this.usersService.resetPassword(resetPasswordInput);
      return result;
    } catch (err) {
      throw new ApolloError(err.message);
    }
  }
}
