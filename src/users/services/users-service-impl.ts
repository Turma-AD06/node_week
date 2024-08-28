import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from './contract/users.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserDto } from '../dtos/user.dto';
import { UserRepository } from 'src/database/repositories/contracts/user.repository';
import { UserMapper } from '../mappers/user.mapper';
import { User } from 'src/database/entities/user.entity';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { PasswordEncoder } from './contract/password-encoder.service';

@Injectable()
export class UsersServiceImpl extends UsersService {
  constructor(
    @Inject()
    private readonly userRepository: UserRepository,
    @Inject()
    private readonly passwordEncoder: PasswordEncoder,
  ) {
    super();
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserDto> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundException('Usuário não encontrado');
    if (updateUserDto.email) {
      user.email = updateUserDto.email;
    }

    if (updateUserDto.password) {
      user.password = await this.passwordEncoder.encode(updateUserDto.password);
    }

    if (updateUserDto.name) {
      user.name = updateUserDto.name;
    }
    const updatedUser = await this.userRepository.updateUser(id, user);
    return new UserDto(updatedUser);
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
