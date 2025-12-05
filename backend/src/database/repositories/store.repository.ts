import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from '../entities/store.entity';

export interface FindAllOptions {
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
  skip?: number;
  take?: number;
}

@Injectable()
export class StoreRepository {
  constructor(
    @InjectRepository(Store)
    private readonly repository: Repository<Store>,
  ) {}

  async findAll(options: FindAllOptions = {}): Promise<[Store[], number]> {
    const { sortBy, sortOrder, skip = 0, take = 6 } = options;

    return this.repository.findAndCount({
      order: sortBy ? { [sortBy]: sortOrder || 'ASC' } : undefined,
      skip,
      take,
    });
  }

  async findById(id: string): Promise<Store | null> {
    return this.repository.findOne({ where: { id } });
  }

  async create(data: Partial<Store>): Promise<Store> {
    const store = this.repository.create(data);

    return this.repository.save(store);
  }

  async update(id: string, data: Partial<Store>): Promise<Store | null> {
    await this.repository.update(id, data);

    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }

  async findAllOptions(): Promise<{ id: string; name: string }[]> {
    return this.repository.find({
      select: ['id', 'name'],
      order: { name: 'ASC' },
    });
  }
}

