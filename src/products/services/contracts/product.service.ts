import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { ProductDto } from 'src/products/dto/product.dto';
import { UpdateProductDto } from 'src/products/dto/update-product.dto';

export abstract class ProductService {
  abstract create(product: CreateProductDto): Promise<ProductDto>;
  abstract update(id: number, product: UpdateProductDto): Promise<ProductDto>;
  abstract delete(id: number): Promise<void>;
  abstract getAll(): Promise<ProductDto[]>;
  abstract getById(id: number): Promise<ProductDto>;
}
