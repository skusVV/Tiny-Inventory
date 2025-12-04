import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from '../entities/store.entity';

@Injectable()
export class StoreRepository {
  constructor(
    @InjectRepository(Store)
    private readonly repository: Repository<Store>,
  ) {}

  async findAll(): Promise<Store[]> {
    return this.repository.find();
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
}

