import { Module } from '@nestjs/common';
import { UsersServiceImpl } from './services/users-service-impl';
import { UsersService } from './services/contract/users.service';
import { UsersController } from './controllers/users.controller';
import { PasswordEncoderImpl } from './services/password-encoder-service-impl';
import { PasswordEncoder } from './services/contract/password-encoder.service';

@Module({
  providers: [
    {
      provide: UsersService,
      useClass: UsersServiceImpl,
    },
    {
      useClass: PasswordEncoderImpl,
      provide: PasswordEncoder,
    },
  ],
  controllers: [UsersController],
})
export class UsersModule {}
