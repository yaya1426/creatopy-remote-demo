import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ItemModel } from 'models/item.model';
import { CreateItemInput } from 'graphql/items/items.inputs';
import { Item } from 'interfaces/item.interface';
import { UserModel } from 'models/user.model';

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel(ItemModel)
    private readonly itemModel: typeof ItemModel,
  ) {}

  async getAll(): Promise<Item[]> {
    const items = await this.itemModel.findAll({
      include: { model: UserModel, as: 'user' },
    });

    return items;
  }

  async createItem(
    createItemInput: CreateItemInput,
    userId: number,
  ): Promise<Item> {
    try {
      if (!userId) {
        throw new Error('Must provide userId');
      }
      const newItem = await this.itemModel.create({
        ...createItemInput,
        userId: userId,
      });
      return newItem;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
