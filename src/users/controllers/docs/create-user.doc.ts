import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
} from '@nestjs/swagger';

export const CreateUserDoc = () =>
  applyDecorators(
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'Nome do usuário',
            default: 'Senhor Lau Lau',
          },
          email: {
            type: 'string',
            description: 'E-mail do usuário',
            default: 'mrlaulau@gmail.com',
          },
          passowrd: {
            type: 'string',
            description: 'Senha do usuário',
            default: '123456789',
          },
        },
      },
    }),
    ApiBadRequestResponse({
      schema: {
        type: 'object',
        properties: {
          statusCode: {
            type: 'number',
            description: 'código do erro gerado',
            default: 400,
          },
        },
      },
    }),
    ApiCreatedResponse({
      schema: {
        type: 'object',
        properties: {
          id: {
            type: 'number',
            description: 'Id gerado no banco de dados',
            default: 1,
          },
          name: {
            type: 'string',
            description: 'Nome do usuário',
            default: 'Senhor Lau Lau',
          },
          email: {
            type: 'string',
            description: 'E-mail do usuário',
            default: 'mrlaulau@gmail.com',
          },
          created_at: {
            type: 'string',
            description: 'ISOString da data de criação',
            default: '2024-01-01T00:00:00.000Z',
          },
          updated_at: {
            type: 'string',
            description: 'ISOString da data de criação',
            default: '2024-01-01T00:00:00.000Z',
          },
        },
      },
    }),
  );
