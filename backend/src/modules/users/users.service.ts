import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AuthService } from 'auth/auth.service';
import { ENTRY_EXISTS } from 'config/apollo-error-types.constants';
import { LoginResult, UserType } from 'graphql/users/users.types';
import { User } from 'interfaces/user.interface';
import { UserModel } from 'models/user.model';
import { LoginInput, SignupInput } from '../../graphql/users/users.inputs';
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

  async login(loginInput: LoginInput): Promise<LoginResult> {
    try {
      const findUser = await this.findOneByUsername(loginInput.username);
      if (findUser) {
        // Compare the password
        const isValidPassword = await bcrypt.compare(
          loginInput.password,
          findUser.password,
        );
        if (isValidPassword) {
          // Create the jwt token
          const token = this.authService.createJwt(findUser).token;
          return { user: findUser, jwt: token };
        }
      }
      return undefined;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async signup(signupInput: SignupInput) {
    // Check if user already exists
    const findUser = await this.findOneByUsername(signupInput.username);
    if (findUser) {
      throw new Error(ENTRY_EXISTS);
    }
    // Encrypt the password
    // generate salt to hash password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(signupInput.password, salt);
    // Create the user
    const createUser = await this.userModel.create({
      ...signupInput,
      password: passwordHash,
    });
    return createUser;
  }
}
