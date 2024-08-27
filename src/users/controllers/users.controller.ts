import {
  Controller,
  Inject,
  Get,
  Body,
  Post,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from '../services/contract/users.service';
import { UserDto } from '../dtos/user.dto';
import { CreateUserDto } from '../dtos/create-user.dto';

@Controller('/v1/users')
export class UsersController {
  constructor(
    @Inject()
    private readonly userService: UsersService,
  ) {}

  @Get()
  public async getAll(): Promise<UserDto[]> {
    return this.userService.getAllUsers();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  public async create(@Body() body: CreateUserDto): Promise<UserDto> {
    return this.userService.createUser(body);
  }
}
