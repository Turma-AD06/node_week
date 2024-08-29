import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services/contracts/auth.service';
import { BodyValidated } from 'src/shared/decorators/body-validated';
import { AuthRequestDto } from '../dto/auth-request.dto';
import { LoginDoc } from './docs/login.doc';

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject()
    private readonly authService: AuthService,
  ) {}

  @Post()
  @LoginDoc()
  @BodyValidated()
  async auth(@Body() auth: AuthRequestDto) {
    return this.authService.login(auth);
  }
}
