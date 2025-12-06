import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';

export interface CategoryWithCount {
  id: string;
  name: string;
  productCount: number;
}

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(Category)
    private readonly repository: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.repository.find();
  }

  async findTopByStoreIds(storeIds: string[], limit: number = 3): Promise<Map<string, CategoryWithCount[]>> {
    if (storeIds.length === 0) {
      return new Map();
    }

    const results = await this.repository
      .createQueryBuilder('category')
      .innerJoin('category.products', 'product', 'product.deleted_at IS NULL')
      .select('product.store_id', 'storeId')
      .addSelect('category.id', 'id')
      .addSelect('category.name', 'name')
      .addSelect('COUNT(product.id)', 'productCount')
      .where('product.store_id IN (:...storeIds)', { storeIds })
      .andWhere('category.deleted_at IS NULL')
      .groupBy('product.store_id')
      .addGroupBy('category.id')
      .addGroupBy('category.name')
      .orderBy('product.store_id')
      .addOrderBy('"productCount"', 'DESC')
      .getRawMany();

    const grouped = new Map<string, CategoryWithCount[]>();

    for (const row of results) {
      const storeId = row.storeId;
      const existing = grouped.get(storeId) || [];

      if (existing.length < limit) {
        existing.push({
          id: row.id,
          name: row.name,
          productCount: parseInt(row.productCount, 10),
        });
        grouped.set(storeId, existing);
      }
    }

    return grouped;
  }
}

