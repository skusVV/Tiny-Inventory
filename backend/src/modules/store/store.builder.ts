import { Store } from '../../database/entities/store.entity';
import { PaginatedStoresResponseDto } from './dto/paginated-stores-response.dto';
import { StoreResponseDto } from './dto/store-response.dto';

export class StoreBuilder {
  static toResponse(store: Store): StoreResponseDto {
    return {
      id: store.id,
      name: store.name,
      description: store.description,
      logoUrl: store.logoUrl,
      location: store.location,
    };
  }

  static toResponseList(stores: Store[]): StoreResponseDto[] {
    return stores.map((store) => this.toResponse(store));
  }

  static toPaginatedResponse(stores: Store[], totalCount: number): PaginatedStoresResponseDto {
    return {
      items: this.toResponseList(stores),
      totalCount,
    };
  }
}

