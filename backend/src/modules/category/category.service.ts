import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../../database/repositories/category.repository';
import { Category } from '../../database/entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.findAll();
  }
}

