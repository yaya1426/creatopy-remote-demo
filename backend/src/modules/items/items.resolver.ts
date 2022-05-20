import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-express';
import { FAILED_TO_RETRIVE } from 'config/apollo-error-types.constants';
import { ItemType } from 'graphql/items/items.types';
import { ItemsService } from './items.service';

@Resolver()
export class ItemsResolver {
  constructor(private itemsService: ItemsService) {}

  @Query((returns) => [ItemType])
  async items(): Promise<ItemType[]> {
    try {
      return await this.itemsService.getAll();
    } catch (err) {
      throw new ApolloError(err.message, FAILED_TO_RETRIVE);
    }
  }
}
