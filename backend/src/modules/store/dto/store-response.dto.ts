export class CategorySummaryDto {
  id: string;
  name: string;
  productCount: number;
}

export class StoreResponseDto {
  id: string;
  name: string;
  description: string | null;
  logoUrl: string | null;
  location: string | null;
  topCategories: CategorySummaryDto[];
}

