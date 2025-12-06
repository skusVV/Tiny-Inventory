import { Store } from '../../database/entities/store.entity';
import { PaginatedStoresResponseDto } from './dto/paginated-stores-response.dto';
import { StoreResponseDto, CategorySummaryDto } from './dto/store-response.dto';

type TopCategoriesMap = Map<string, CategorySummaryDto[]>;

export class StoreBuilder {
  static toResponse(store: Store, topCategories: CategorySummaryDto[] = []): StoreResponseDto {
    return {
      id: store.id,
      name: store.name,
      description: store.description,
      logoUrl: store.logoUrl,
      location: store.location,
      topCategories,
    };
  }

  static toResponseList(stores: Store[], topCategoriesMap: TopCategoriesMap = new Map()): StoreResponseDto[] {
    return stores.map((store) => this.toResponse(store, topCategoriesMap.get(store.id) || []));
  }

  static toPaginatedResponse(stores: Store[], totalCount: number, topCategoriesMap: TopCategoriesMap = new Map()): PaginatedStoresResponseDto {
    return {
      items: this.toResponseList(stores, topCategoriesMap),
      totalCount,
    };
  }
}

