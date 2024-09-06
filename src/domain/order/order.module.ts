import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from '../item/entity/item.entity';
import { User } from '../user/entity/user.entity';
import { OrderController } from './controller/order.controller';
import { OrderItem } from './entity/order-item.entity';
import { Order } from './entity/order.entity';
import { OrderService } from './service/order.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem, User, Item])],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
