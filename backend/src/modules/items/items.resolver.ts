import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-express';
import { JwtAuthGuard } from 'modules/auth/guards/jwt-auth-guard';
import {
  FAILED_TO_CREATE,
  FAILED_TO_RETRIVE,
} from 'config/apollo-error-types.constants';
import { CreateItemInput } from 'graphql/items/items.inputs';
import { ItemType } from 'graphql/items/items.types';
import { UserType } from 'graphql/users/users.types';
import { CurrentUser } from 'modules/users/users.decorator';
import { ItemsService } from './items.service';

@Resolver()
export class ItemsResolver {
  constructor(private itemsService: ItemsService) {}

  @Query((returns) => [ItemType])
  async items() {
    try {
      return await this.itemsService.getAll();
    } catch (err) {
      throw new ApolloError(err.message, FAILED_TO_RETRIVE);
    }
  }

  @Mutation((returns) => ItemType)
  @UseGuards(JwtAuthGuard)
  async createItem(
    @Args('data') data: CreateItemInput,
    @CurrentUser() user: UserType,
  ) {
    try {
      return await this.itemsService.createItem(data, user?.id);
    } catch (err) {
      throw new ApolloError(err.message, FAILED_TO_CREATE);
    }
  }
}
