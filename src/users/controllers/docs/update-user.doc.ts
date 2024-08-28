import { applyDecorators } from '@nestjs/common';
import { UpdateUserDto } from './../../dtos/update-user.dto';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { UserDto } from 'src/users/dtos/user.dto';

export const UpdateUserDoc = () =>
  applyDecorators(
    ApiBody({
      description: 'Objeto do usuário a ser atualizado',
      type: UpdateUserDto,
    }),
    ApiOkResponse({
      description: 'Resposta de usuário atualizado',
      type: UserDto,
    }),
  );
