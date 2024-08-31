import { Product } from './../../entities/product.entity';

export abstract class ProductRepository {
  abstract create(product: Product): Promise<Product>;
  abstract update(id: number, product: Product): Promise<Product>;
  abstract findById(id: number): Promise<Product | null>;
  abstract delete(id: number): Promise<void>;
  abstract findAll(): Promise<Product[]>;
}
