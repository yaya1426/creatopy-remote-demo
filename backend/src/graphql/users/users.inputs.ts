import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginInput {
  @Field()
  username: string;

  @Field()
  password: string;
}

@InputType()
export class SignupInput {
  @Field()
  name: string;

  @Field()
  username: string;

  @Field()
  password: string;

  @Field()
  confirmPassword: string;
}

@InputType()
export class VerifyUserInput {
  @Field()
  username: string;

  @Field()
  recoveryCode: string;
}

@InputType()
export class ResetPasswordInput {
  @Field()
  username: string;

  @Field()
  newPassword: string;

  @Field()
  confirmNewPassword: string;
}
