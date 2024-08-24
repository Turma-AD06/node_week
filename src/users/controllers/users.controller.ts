import { Controller, Inject, Get, Body, Post } from '@nestjs/common';
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
  public async create(@Body() body: CreateUserDto): Promise<UserDto> {
    return this.userService.createUser(body);
  }
}
