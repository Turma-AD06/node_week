import { Injectable } from '@nestjs/common';
import { ProductRepository } from './contracts/product.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductRepositoryImpl extends ProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {
    super();
  }
  async create(product: Product): Promise<Product> {
    return this.productRepository.save(product);
  }
  async update(id: number, product: Product): Promise<Product> {
    await this.productRepository.update({ id }, product);
    return this.findById(id);
  }
  findById(id: number): Promise<Product | null> {
    return this.productRepository.findOneBy({ id });
  }
  async delete(id: number): Promise<void> {
    await this.productRepository.delete({ id });
  }
  findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }
}
