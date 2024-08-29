import { applyDecorators } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';

export const LoginDoc = () =>
  applyDecorators(
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          email: {
            type: 'string',
            default: 'email@email.com',
          },
          password: {
            type: 'string',
            default: '123456789',
          },
        },
      },
    }),
  );
