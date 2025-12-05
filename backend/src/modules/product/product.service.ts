import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository, ProductFindAllOptions } from '../../database/repositories/product.repository';
import { Product } from '../../database/entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async findAll(options: ProductFindAllOptions = {}): Promise<[Product[], number]> {
    return this.productRepository.findAll(options);
  }

  async findByStoreId(storeId: string): Promise<Product[]> {
    return this.productRepository.findByStoreId(storeId);
  }

  async findById(id: string): Promise<Product> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return product;
  }

  async create(dto: CreateProductDto): Promise<Product> {
    const { categoryIds, ...productData } = dto;

    return this.productRepository.create({ ...productData, categoryIds });
  }

  async update(id: string, dto: UpdateProductDto): Promise<Product> {
    const { categoryIds, ...productData } = dto;
    const product = await this.productRepository.update(id, { ...productData, categoryIds });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return product;
  }

  async delete(id: string): Promise<void> {
    await this.findById(id);
    await this.productRepository.delete(id);
  }
}

