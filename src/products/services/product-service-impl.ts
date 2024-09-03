import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProductService } from './contracts/product.service';
import { ProductRepository } from 'src/database/repositories/contracts/product.repository';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductDto } from '../dto/product.dto';
import { ProductMapper } from '../mappers/product-mapper';
import { UpdateProductDto } from '../dto/update-product.dto';

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

  async update(id: number, product: UpdateProductDto): Promise<ProductDto> {
    await this.getById(id);

    const productUpdated = await this.productRepository.update(
      id,
      ProductMapper.updateToEntity(product),
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
    console.log(products);
    return products.map((product) => new ProductDto(product));
  }

  async delete(id: number): Promise<void> {
    await this.getById(id);
    await this.productRepository.delete(id);
  }
}
