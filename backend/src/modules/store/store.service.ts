import { Injectable, NotFoundException } from '@nestjs/common';
import { StoreRepository, FindAllOptions } from '../../database/repositories/store.repository';
import { CategoryService } from '../category/category.service';
import { ProductService } from '../product/product.service';
import { Store } from '../../database/entities/store.entity';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { CategoryWithCount } from '../../database/repositories/category.repository';

@Injectable()
export class StoreService {
  constructor(
    private readonly storeRepository: StoreRepository,
    private readonly categoryService: CategoryService,
    private readonly productService: ProductService,
  ) {}

  async findAll(options: FindAllOptions = {}): Promise<[Store[], number, Map<string, CategoryWithCount[]>]> {
    const [stores, count] = await this.storeRepository.findAll(options);
    const storeIds = stores.map((s) => s.id);
    const topCategoriesMap = await this.categoryService.findTopByStoreIds(storeIds);

    return [stores, count, topCategoriesMap];
  }

  async findById(id: string): Promise<[Store, CategoryWithCount[]]> {
    const store = await this.storeRepository.findById(id);

    if (!store) {
      throw new NotFoundException(`Store with id ${id} not found`);
    }

    const topCategoriesMap = await this.categoryService.findTopByStoreIds([id]);
    const topCategories = topCategoriesMap.get(id) || [];

    return [store, topCategories];
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
    const [store] = await this.findById(id);

    await this.productService.deleteByStoreId(store.id);
    await this.storeRepository.delete(store.id);
  }

  async findAllOptions(): Promise<{ id: string; name: string }[]> {
    return this.storeRepository.findAllOptions();
  }
}

