import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProductService } from './contracts/product.service';
import { ProductRepository } from 'src/database/repositories/contracts/product.repository';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductDto } from '../dto/product.dto';
import { ProductMapper } from '../mappers/product-mapper';
import { UpdateProductDto } from '../dto/update-product.dto';
import { unlink } from 'fs/promises';

@Injectable()
export class ProductServiceImpl extends ProductService {
  constructor(
    @Inject()
    private readonly productRepository: ProductRepository,
  ) {
    super();
  }

  async create(product: CreateProductDto): Promise<ProductDto> {
    const productSaved = await this.productRepository.create(
      ProductMapper.createToEntity(product),
    );
    return new ProductDto(productSaved);
  }

  async update(id: number, dto: UpdateProductDto): Promise<ProductDto> {
    const product = await this.getById(id);

    if (dto.image && product.image) {
      try {
        await unlink(product.image);
      } catch (e: any) {
        console.log('Erro', e);
      }
    }

    const productUpdated = await this.productRepository.update(
      id,
      ProductMapper.updateToEntity(dto),
    );
    return new ProductDto(productUpdated);
  }

  async getById(id: number): Promise<ProductDto> {
    const product = await this.productRepository.findById(id);

    if (!product) throw new NotFoundException('Produto não encontrado');

    return new ProductDto(product);
  }

  async getAll(): Promise<ProductDto[]> {
    const products = await this.productRepository.findAll();

    return products.map((product) => new ProductDto(product));
  }

  async delete(id: number): Promise<void> {
    await this.getById(id);
    await this.productRepository.delete(id);
  }
}
