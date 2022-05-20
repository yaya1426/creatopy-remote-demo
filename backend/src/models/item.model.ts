import { Item } from 'interfaces/item.interface';
import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { UserModel } from './user.model';

@Table({ tableName: 'item' })
export class ItemModel extends Model<Item> {
  @Column
  title: string;

  @Column
  created_at: Date;

  @Column({ defaultValue: true })
  password: string;

  @ForeignKey(() => UserModel)
  @Column
  userId: number;

  @BelongsTo(() => UserModel)
  user: UserModel;
}
