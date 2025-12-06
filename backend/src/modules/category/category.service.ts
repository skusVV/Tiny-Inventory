import { Injectable } from '@nestjs/common';
import { CategoryRepository, CategoryWithCount } from '../../database/repositories/category.repository';
import { Category } from '../../database/entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.findAll();
  }

  async findTopByStoreIds(storeIds: string[], limit: number = 3): Promise<Map<string, CategoryWithCount[]>> {
    return this.categoryRepository.findTopByStoreIds(storeIds, limit);
  }
}

