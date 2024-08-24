import { Module } from '@nestjs/common';
import { UsersServiceImpl } from './services/users-service-impl';
import { UsersService } from './services/contract/users.service';
import { UsersController } from './controllers/users.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: UsersService,
      useClass: UsersServiceImpl,
    },
  ],
  controllers: [UsersController],
})
export class UsersModule {}
