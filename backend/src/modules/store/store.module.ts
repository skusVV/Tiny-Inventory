import { Module } from '@nestjs/common';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';
import { DatabaseModule } from '../../database/database.module';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [DatabaseModule, ProductModule],
  controllers: [StoreController],
  providers: [StoreService],
})
export class StoreModule {}



