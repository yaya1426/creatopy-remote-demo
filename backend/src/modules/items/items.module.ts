import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsResolver } from './items.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { ItemModel } from 'models/item.model';

@Module({
  imports: [SequelizeModule.forFeature([ItemModel])],
  providers: [ItemsService, ItemsResolver],
})
export class ItemsModule {}
