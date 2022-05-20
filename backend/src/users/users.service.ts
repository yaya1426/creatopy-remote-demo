import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AuthService } from 'auth/auth.service';
import { LoginInput } from './graphql/users.inputs';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService)) private authService: AuthService,
  ) {}

  async findOneByUsername(username: string) {
    return null;
  }

  async login(loginInput: LoginInput) {
    return null;
  }
}
