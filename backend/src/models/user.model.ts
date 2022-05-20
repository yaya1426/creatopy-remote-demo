import { User } from 'interfaces/user.interface';
import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { ItemModel } from './item.model';

@Table({ tableName: 'user' })
export class UserModel extends Model<User> {
  @Column
  name: string;

  @Column
  username: string;

  @Column
  password: string;

  @HasMany(() => ItemModel)
  items: ItemModel[];
}
