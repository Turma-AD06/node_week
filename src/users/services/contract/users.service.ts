import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { UpdateUserDto } from 'src/users/dtos/update-user.dto';
import { UserDto } from 'src/users/dtos/user.dto';

export abstract class UsersService {
  abstract update(id: number, updateUserDto: UpdateUserDto): Promise<UserDto>;
  abstract createUser(dto: CreateUserDto): Promise<UserDto>;
  abstract getAllUsers(): Promise<UserDto[]>;
}
