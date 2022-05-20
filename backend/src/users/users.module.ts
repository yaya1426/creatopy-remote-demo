import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { AuthModule } from 'auth/auth.module';
import { ConfigModule } from 'config/config.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from 'models/user.model';

@Module({
  imports: [
    ConfigModule,
    forwardRef(() => AuthModule), // Here we added forwardedRef because both modules import each other
    SequelizeModule.forFeature([UserModel]),
  ],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
