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
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductService } from '../services/contracts/product.service';
import { JwtAuth } from 'src/shared/decorators/jwt-auth';
import { BodyValidated } from 'src/shared/decorators/body-validated';
import { CreateProductDto } from '../dto/create-product.dto';
import { CreateProductDoc } from './docs/create-product.doc';
import { UpdateProductDto } from '../dto/update-product.dto';
import { UpdateProductDoc } from './docs/update-product.doc';

@ApiTags('Produtos')
@Controller('/v1/products')
export class ProductsController {
  constructor(@Inject() private readonly productService: ProductService) {}

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
  create(@Req() { user }: any, @Body() dto: CreateProductDto) {
    dto.user = user;
    return this.productService.create(dto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @JwtAuth()
  @UpdateProductDoc()
  @BodyValidated()
  update(@Param('id') id: number, @Body() dto: UpdateProductDto) {
    return this.productService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @JwtAuth()
  delete(@Param('id') id: number) {
    return this.productService.delete(id);
  }
}
