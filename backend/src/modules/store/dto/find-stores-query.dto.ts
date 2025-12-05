import { IsEnum, IsOptional } from 'class-validator';

export enum StoreSortBy {
  NAME = 'name',
  CREATED_AT = 'createdAt',
}

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class FindStoresQueryDto {
  @IsOptional()
  @IsEnum(StoreSortBy)
  sortBy?: StoreSortBy;

  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder?: SortOrder;
}

