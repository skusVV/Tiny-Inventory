export class UpdateProductDto {
  name?: string;
  description?: string;
  quantity?: number;
  price?: number;
  imageUrl?: string;
  storeId?: string;
  categoryIds?: string[];
}

