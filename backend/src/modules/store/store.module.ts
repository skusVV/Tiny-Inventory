import { Module } from '@nestjs/common';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';
import { DatabaseModule } from '../../database/database.module';
import { ProductModule } from '../product/product.module';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [DatabaseModule, ProductModule, CategoryModule],
  controllers: [StoreController],
  providers: [StoreService],
})
export class StoreModule {}



