import { Module } from '@nestjs/common';

import { PrismaModule } from './config/database.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
