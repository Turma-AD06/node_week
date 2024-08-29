import { Global, Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/contracts/auth.service';
import { AuthServiceImpl } from './services/auth-service-impl';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRATION,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: AuthService,
      useClass: AuthServiceImpl,
    },
  ],
})
export class AuthModule {}
