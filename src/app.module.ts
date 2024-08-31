import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { ValueIsUnique } from './shared/validations/value-is-unique';
import { AuthModule } from './auth/auth.module';
import { CommandModule } from 'nestjs-command';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [DatabaseModule, UsersModule, AuthModule, CommandModule, ProductsModule],
  controllers: [AppController],
  providers: [ValueIsUnique],
  exports: [ValueIsUnique],
})
export class AppModule {}
