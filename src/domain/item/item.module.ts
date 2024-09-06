import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemController } from './controller/item.controller';
import { Item } from './entity/item.entity';
import { ItemService } from './service/item.service';

@Module({
  imports: [TypeOrmModule.forFeature([Item])],
  providers: [ItemService],
  controllers: [ItemController],
})
export class ItemModule {}
