import {
  Controller,
  Inject,
  Get,
  Body,
  Post,
  ValidationPipe,
  UsePipes,
  Put,
  Param,
} from '@nestjs/common';
import { UsersService } from '../services/contract/users.service';
import { UserDto } from '../dtos/user.dto';
import { CreateUserDto } from '../dtos/create-user.dto';
import { CreateUserDoc } from './docs/create-user.doc';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { JwtAuth } from 'src/shared/decorators/jwt-auth';

@Controller('/v1/users')
@ApiTags('Usuários')
export class UsersController {
  constructor(
    @Inject()
    private readonly userService: UsersService,
  ) {}

  @Get()
  @JwtAuth()
  @ApiBearerAuth()
  public async getAll(): Promise<UserDto[]> {
    return this.userService.getAllUsers();
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserDto> {
    return this.userService.update(id, updateUserDto);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @CreateUserDoc()
  public async create(@Body() body: CreateUserDto): Promise<UserDto> {
    return this.userService.createUser(body);
  }
}
