import { Field, ObjectType } from '@nestjs/graphql';
import { UserType } from 'graphql/users/users.types';
import { Item } from 'interfaces/item.interface';

@ObjectType('Item')
export class ItemType implements Item {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  created_at: Date;

  @Field((type) => UserType)
  user: UserType;
}
