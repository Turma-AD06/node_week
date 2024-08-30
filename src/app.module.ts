import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { ValueIsUnique } from './shared/validations/value-is-unique';
import { AuthModule } from './auth/auth.module';
import { CommandModule } from 'nestjs-command';

@Module({
  imports: [DatabaseModule, UsersModule, AuthModule, CommandModule],
  controllers: [AppController],
  providers: [ValueIsUnique],
  exports: [ValueIsUnique],
})
export class AppModule {}
