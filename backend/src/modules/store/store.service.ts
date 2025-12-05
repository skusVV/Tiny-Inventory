import { Injectable, NotFoundException } from '@nestjs/common';
import { StoreRepository } from '../../database/repositories/store.repository';
import { Store } from '../../database/entities/store.entity';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Injectable()
export class StoreService {
  constructor(private readonly storeRepository: StoreRepository) {}

  async findAll(sortBy?: string, sortOrder?: 'ASC' | 'DESC'): Promise<Store[]> {
    return this.storeRepository.findAll(sortBy, sortOrder);
  }

  async findById(id: string): Promise<Store> {
    const store = await this.storeRepository.findById(id);

    if (!store) {
      throw new NotFoundException(`Store with id ${id} not found`);
    }

    return store;
  }

  async create(dto: CreateStoreDto): Promise<Store> {
    return this.storeRepository.create(dto);
  }

  async update(id: string, dto: UpdateStoreDto): Promise<Store> {
    const store = await this.storeRepository.update(id, dto);

    if (!store) {
      throw new NotFoundException(`Store with id ${id} not found`);
    }

    return store;
  }

  async delete(id: string): Promise<void> {
    await this.findById(id);
    await this.storeRepository.delete(id);
  }
}

