import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AuthService } from 'modules/auth/auth.service';
import {
  ENTRY_EXISTS,
  FAILED_TO_RETRIVE,
  FAILED_TO_UPDATE,
} from 'config/apollo-error-types.constants';
import { LoginSignupResult, UserType } from 'graphql/users/users.types';
import { User } from 'interfaces/user.interface';
import { UserModel } from 'models/user.model';
import {
  LoginInput,
  ResetPasswordInput,
  SignupInput,
} from '../../graphql/users/users.inputs';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService)) private authService: AuthService,
    @InjectModel(UserModel)
    private readonly userModel: typeof UserModel,
  ) {}

  async findOneByUsername(username: string): Promise<User> {
    const user = await this.userModel.findOne({
      where: { username: username },
    });
    if (user) {
      return user;
    }
    return undefined;
  }

  async login(loginInput: LoginInput): Promise<LoginSignupResult> {
    try {
      const findUser = await this.findOneByUsername(loginInput.username);
      if (findUser) {
        // Compare the password
        const isValidPassword = await bcrypt.compare(
          loginInput.password,
          findUser.password,
        );
        if (isValidPassword) {
          // Create the jwt result
          return this.generateLoginSignupResult(findUser);
        }
      }
      return undefined;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async signup(signupInput: SignupInput): Promise<LoginSignupResult> {
    // Check if user already exists
    const findUser = await this.findOneByUsername(signupInput.username);
    if (findUser) {
      throw new Error(ENTRY_EXISTS);
    }
    // Hash the password
    const passwordHash = await this.generatePasswordHash(signupInput.password);
    // Create the user
    const createUser = await this.userModel.create({
      ...signupInput,
      password: passwordHash,
    });
    return this.generateLoginSignupResult(createUser);
  }

  async resetPassword(
    resetPasswordInput: ResetPasswordInput,
    user: UserType,
  ): Promise<boolean> {
    try {
      const findUser = await this.findOneByUsername(user.username);
      if (!findUser) {
        throw new Error(FAILED_TO_RETRIVE);
      }
      // Generate new password hash
      const passwordHash = await this.generatePasswordHash(
        resetPasswordInput.newPassword,
      );
      const updateUser = await this.userModel.update(
        { ...findUser, password: passwordHash },
        { where: { id: findUser.id } },
      );
      if (updateUser.length > 0) {
        return true;
      }
      return false;
    } catch (err) {
      throw new Error(FAILED_TO_UPDATE);
    }
  }

  private async generatePasswordHash(password: string) {
    // generate salt to hash password
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  private async generateLoginSignupResult(user: User) {
    // Create the jwt token
    const token = this.authService.createJwt(user).token;
    return { user: user, jwt: token };
  }
}
