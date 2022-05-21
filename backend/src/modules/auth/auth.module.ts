import { forwardRef, Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from 'config/config.module';
import { ConfigService } from 'config/config.service';
import { UsersModule } from 'modules/users/users.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const options: JwtModuleOptions = {
          secret: configService.get('JWT_SECRET'),
        };
        const expiresIn = configService.get('JWT_EXPIRES_IN');
        if (expiresIn) {
          options.signOptions = {
            expiresIn: `${expiresIn}h`,
          };
        }
        return options;
      },
      inject: [ConfigService],
    }),
    forwardRef(() => UsersModule),
    ConfigModule,
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
