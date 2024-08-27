import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { IsUnique } from 'src/shared/validations/value-is-unique';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @IsUnique('users', 'email')
  email: string;

  @IsNotEmpty()
  @Length(8, 20)
  password: string;
}
