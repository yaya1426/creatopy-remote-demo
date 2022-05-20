import { Field, ObjectType } from '@nestjs/graphql';
import { ItemType } from 'graphql/items/items.types';
import { User } from 'interfaces/user.interface';

@ObjectType('User')
export class UserType implements User {
  @Field()
  id?: number;

  @Field()
  username: string;

  @Field()
  name: string;

  @Field((type) => ItemType, { nullable: true })
  items: ItemType[];
}

@ObjectType()
export class LoginResult {
  @Field()
  user: UserType;

  @Field()
  jwt: string;
}
