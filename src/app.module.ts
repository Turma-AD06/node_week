import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { ValueIsUnique } from './shared/validations/value-is-unique';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [AppController],
  providers: [ValueIsUnique],
  exports: [ValueIsUnique],
})
export class AppModule {}
