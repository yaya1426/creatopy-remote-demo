import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './constants/jwt-payload.interface';
import { ConfigService } from 'config/config.service';
import { UsersService } from 'modules/users/users.service';
import { UserType } from 'graphql/users/users.types';
import { UserModel } from 'models/user.model';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateJwtPayload(payload: JwtPayload) {
    // This will be used when the user has already logged in and has a JWT
    const user = await this.usersService.findOneByUsername(payload.username);
    // Ensure the user exists
    if (user) {
      return user;
    }

    return undefined;
  }

  createJwt(user: UserType): { data: JwtPayload; token: string } {
    const expiresIn = Number(this.configService.get('JWT_EXPIRES_IN'));
    let expiration: Date | undefined;
    if (expiresIn) {
      expiration = new Date();
      expiration.setHours(expiration.getHours() + expiresIn);
    }
    const data: JwtPayload = {
      username: user.username,
      expiration,
    };

    const jwt = this.jwtService.sign(data);

    return {
      data,
      token: jwt,
    };
  }
}
