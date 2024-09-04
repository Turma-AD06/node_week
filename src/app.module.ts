import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CommandModule } from 'nestjs-command';
import { ProductsModule } from './products/products.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    AuthModule,
    CommandModule,
    ProductsModule,
    SharedModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
