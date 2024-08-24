import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { UserDto } from 'src/users/dtos/user.dto';

export abstract class UsersService {
  abstract createUser(dto: CreateUserDto): Promise<UserDto>;
  abstract getAllUsers(): Promise<UserDto[]>;
}
