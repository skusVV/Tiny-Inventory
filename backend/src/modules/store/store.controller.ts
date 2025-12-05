import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { FindStoresQueryDto } from './dto/find-stores-query.dto';
import { StoreBuilder } from './store.builder';
import { StoreResponseDto } from './dto/store-response.dto';

@Controller('stores')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Get()
  async findAll(@Query() query: FindStoresQueryDto): Promise<StoreResponseDto[]> {
    const stores = await this.storeService.findAll(query.sortBy, query.sortOrder);

    return StoreBuilder.toResponseList(stores);
  }

  @Get(':id')
  async findById(@Param('id', ParseUUIDPipe) id: string): Promise<StoreResponseDto> {
    const store = await this.storeService.findById(id);

    return StoreBuilder.toResponse(store);
  }

  @Post()
  async create(@Body() dto: CreateStoreDto): Promise<StoreResponseDto> {
    const store = await this.storeService.create(dto);

    return StoreBuilder.toResponse(store);
  }

  @Patch(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateStoreDto): Promise<StoreResponseDto> {
    const store = await this.storeService.update(id, dto);

    return StoreBuilder.toResponse(store);
  }

  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.storeService.delete(id);
  }
}

