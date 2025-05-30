import { Module } from '@nestjs/common';

import { PrismaModule } from './config/database.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { DeskModule } from './modules/desk/desk.module';

@Module({
  imports: [PrismaModule, AuthModule, UserModule, DeskModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
