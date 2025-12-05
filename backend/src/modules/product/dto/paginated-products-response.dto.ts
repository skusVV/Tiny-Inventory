import { Product } from '../../../database/entities/product.entity';

export class PaginatedProductsResponseDto {
  items: Product[];
  totalCount: number;
}

