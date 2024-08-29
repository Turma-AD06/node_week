import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { ValueIsUnique } from './shared/validations/value-is-unique';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DatabaseModule, UsersModule, AuthModule],
  controllers: [AppController],
  providers: [ValueIsUnique],
  exports: [ValueIsUnique],
})
export class AppModule {}
