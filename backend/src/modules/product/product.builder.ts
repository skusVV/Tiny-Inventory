import { Product } from '../../database/entities/product.entity';
import { PaginatedProductsResponseDto } from './dto/paginated-products-response.dto';

export class ProductBuilder {
  static toResponseList(products: Product[]): Product[] {
    return products;
  }

  static toPaginatedResponse(products: Product[], totalCount: number): PaginatedProductsResponseDto {
    return {
      items: this.toResponseList(products),
      totalCount,
    };
  }
}

