import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Product } from './../../database/entities/product.entity';

export class ProductMapper {
  public static createToEntity(dto: CreateProductDto): Product {
    const product = new Product();
    product.name = dto.name;
    product.description = dto.description;
    product.price = dto.price;
    product.user = dto.user;
    product.score = dto.score;
    product.image = dto.image;
    return product;
  }

  public static updateToEntity(dto: UpdateProductDto): Product {
    const product = new Product();
    product.name = dto.name;
    product.description = dto.description;
    product.price = dto.price;
    product.image = dto.image;
    product.score = dto.score;
    return product;
  }
}
