import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from './contract/users.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserDto } from '../dtos/user.dto';
import { UserRepository } from 'src/database/repositories/contracts/user.repository';
import { UserMapper } from '../mappers/user.mapper';
import { User } from 'src/database/entities/user.entity';

@Injectable()
export class UsersServiceImpl extends UsersService {
  constructor(
    @Inject()
    private readonly userRepository: UserRepository,
  ) {
    super();
  }

  async createUser(dto: CreateUserDto): Promise<UserDto> {
    const user: User = UserMapper.toEntity(dto);
    const userSaved = await this.userRepository.createUser(user);
    return new UserDto(userSaved);
  }

  async getAllUsers(): Promise<UserDto[]> {
    const users: User[] = await this.userRepository.findAll();

    return users.map((entity) => new UserDto(entity));
  }
}
