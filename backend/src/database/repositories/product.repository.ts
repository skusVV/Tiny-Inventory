import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { Category } from '../entities/category.entity';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.repository.find({ relations: ['categories'] });
  }

  async findById(id: string): Promise<Product | null> {
    return this.repository.findOne({ where: { id }, relations: ['categories'] });
  }

  async create(data: { categoryIds: string[] } & Omit<Partial<Product>, 'categories'>): Promise<Product> {
    const { categoryIds, ...productData } = data;
    const categories = await this.categoryRepository.findBy({ id: In(categoryIds) });
    const product = this.repository.create({ ...productData, categories });

    return this.repository.save(product);
  }

  async update(id: string, data: { categoryIds?: string[] } & Omit<Partial<Product>, 'categories'>): Promise<Product | null> {
    const { categoryIds, ...productData } = data;
    const product = await this.findById(id);

    if (!product) {
      return null;
    }

    Object.assign(product, productData);

    if (categoryIds) {
      product.categories = await this.categoryRepository.findBy({ id: In(categoryIds) });
    }

    return this.repository.save(product);
  }

  async delete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }
}

