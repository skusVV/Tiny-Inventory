import { StoreResponseDto } from './store-response.dto';

export class PaginatedStoresResponseDto {
  items: StoreResponseDto[];
  totalCount: number;
}

