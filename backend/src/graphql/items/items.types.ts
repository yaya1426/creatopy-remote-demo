import { Field, ObjectType } from '@nestjs/graphql';
import { UserType } from 'graphql/users/users.types';
import { Item } from 'interfaces/item.interface';

@ObjectType('Item')
export class ItemType implements Item {
  @Field()
  id: number;

  @Field()
  title: string;

  @Field()
  createdAt: Date;

  @Field((type) => UserType)
  user: UserType;
}
