import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';

export const UpdateProductDoc = () =>
  applyDecorators(
    ApiBearerAuth(),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            default: 'Capinha que não protege iPhone da queda',
          },
          description: {
            type: 'string',
            default: 'Capinha que quando o iPhone cai, ela desacopla',
          },
          price: {
            type: 'integer',
            default: 1099,
          },
          score: {
            type: 'float',
            default: 1.3,
          },
        },
      },
    }),
  );
