import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductService } from '../services/contracts/product.service';
import { JwtAuth } from 'src/shared/decorators/jwt-auth';
import { BodyValidated } from 'src/shared/decorators/body-validated';
import { CreateProductDto } from '../dto/create-product.dto';
import { CreateProductDoc } from './docs/create-product.doc';
import { UpdateProductDto } from '../dto/update-product.dto';
import { UpdateProductDoc } from './docs/update-product.doc';
import { FileUploadService } from 'src/shared/services/contracts/file-upload.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { randomUUID } from 'crypto';
import { Arr } from 'src/shared/utils/arr';

@ApiTags('Produtos')
@Controller('/v1/products')
export class ProductsController {
  constructor(
    @Inject() private readonly productService: ProductService,
    @Inject() private readonly uploadFileService: FileUploadService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAll() {
    return this.productService.getAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @JwtAuth()
  @CreateProductDoc()
  @BodyValidated()
  @UseInterceptors(
    FileFieldsInterceptor([
      {
        name: 'image',
        maxCount: 1,
      },
    ]),
  )
  async create(
    @Req() { user }: any,
    @Body() dto: CreateProductDto,
    @UploadedFiles() file: { image?: any[] },
  ) {
    const { image } = file ?? {};
    dto.user = user;
    if (dto.image && typeof dto.image === 'string') {
      dto.image = await this.uploadFileService.uploadFileFromBase64(dto.image);
    }

    if (image) {
      dto.image = await this.uploadFileService.uploadFileFromBuffer(
        image[0].buffer,
        ['public', 'storage', 'products', user.id],
        `${randomUUID()}.${Arr.last(image[0].originalname.split('.'))}`,
      );
    }

    return this.productService.create(dto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @JwtAuth()
  @UpdateProductDoc()
  @BodyValidated()
  @UseInterceptors(
    FileFieldsInterceptor([
      {
        name: 'image',
        maxCount: 1,
      },
    ]),
  )
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateProductDto,
    @UploadedFiles() file: { image?: any[] },
    @Req() { user }: any,
  ) {
    const { image } = file ?? {};

    if (dto.image && typeof dto.image === 'string') {
      dto.image = await this.uploadFileService.uploadFileFromBase64(dto.image);
    }

    if (image) {
      dto.image = await this.uploadFileService.uploadFileFromBuffer(
        image[0].buffer,
        ['public', 'storage', 'products', user.id],
        `${randomUUID()}.${Arr.last(image[0].originalname.split('.'))}`,
      );
    }
    return this.productService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @JwtAuth()
  delete(@Param('id') id: number) {
    return this.productService.delete(id);
  }
}
