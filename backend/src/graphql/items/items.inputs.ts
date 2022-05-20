import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateItemInput {
  @Field()
  title: string;
}
