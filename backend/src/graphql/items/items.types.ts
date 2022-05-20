import { Field, ObjectType } from '@nestjs/graphql';
import { UserType } from 'graphql/users/users.types';
import { Item } from 'interfaces/item.interface';

@ObjectType('Item')
export class ItemType implements Item {
  @Field()
  id?: number;

  @Field()
  title: string;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  userId?: number;

  @Field((type) => UserType, { nullable: true })
  user?: UserType;
}
