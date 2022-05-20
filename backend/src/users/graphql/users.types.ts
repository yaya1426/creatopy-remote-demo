import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  username: string;

  @Field()
  name: string;
}

@ObjectType()
export class LoginResult {
  @Field()
  user: User;

  @Field()
  jwt: string;
}
