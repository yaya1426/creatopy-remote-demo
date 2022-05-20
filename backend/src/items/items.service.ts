import { Injectable } from '@nestjs/common';
import { ItemType } from 'graphql/items/items.types';

@Injectable()
export class ItemsService {
  constructor() {}

  async getAll(): Promise<ItemType[]> {
    return [];
  }
}
