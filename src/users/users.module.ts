import { Module } from '@nestjs/common';
import { UsersServiceImpl } from './services/users-service-impl';
import { UsersService } from './services/contract/users.service';
import { UsersController } from './controllers/users.controller';

@Module({
  providers: [
    {
      provide: UsersService,
      useClass: UsersServiceImpl,
    },
  ],
  controllers: [UsersController],
})
export class UsersModule {}
