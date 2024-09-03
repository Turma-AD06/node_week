import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { ApiOkResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('health check')
@Controller('/v1')
export class AppController {
  @ApiOperation({
    description: 'Verifica se a api foi inicializada com sucesso.',
  })
  @ApiOkResponse({ description: 'Operação realizada com sucesso!' })
  @Get('/health')
  getHello(@Res() res: Response): Response {
    return res.status(HttpStatus.OK).json({
      status: 200,
      message: 'api is running!',
    });
  }
}
