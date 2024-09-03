import { Module } from '@nestjs/common';
import { ProductServiceImpl } from './services/product-service-impl';
import { ProductService } from './services/contracts/product.service';
import { ProductsController } from './controllers/products.controller';

@Module({
  providers: [
    {
      provide: ProductService,
      useClass: ProductServiceImpl,
    },
  ],
  controllers: [ProductsController],
})
export class ProductsModule {}
