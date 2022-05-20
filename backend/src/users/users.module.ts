import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { AuthModule } from 'auth/auth.module';
import { ConfigModule } from 'config/config.module';

@Module({
  // Here we added forwardedRef because both modules import each other
  imports: [ConfigModule, forwardRef(() => AuthModule)],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
