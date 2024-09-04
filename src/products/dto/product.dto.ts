import { Product } from 'src/database/entities/product.entity';

export class ProductDto {
  id: number;
  user_id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
  score: number;
  imageUrl?: string;

  constructor(product: Product) {
    this.id = product.id;
    this.description = product.description;
    this.name = product.name;
    this.user_id = product.user.id;
    this.image = product.image;
    this.price = product.price;
    this.score = product.score;
    if (product.image) {
      this.imageUrl = `http://127.0.0.1:3000/${product.image.replace('public/', '')}`;
    }
  }
}
