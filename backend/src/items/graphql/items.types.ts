import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'users/graphql/users.types';

@ObjectType()
export class Item {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  created_at: Date;

  @Field((type) => User)
  user: User;
}
