import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from '../item/entity/item.entity';
import { User } from '../user/entity/user.entity';
import { OrderController } from './controller/order.controller';
import { OrderItem } from './entity/order-item.entity';
import { Order } from './entity/order.entity';
import { OptimisticOrderService } from './service/optimistic-order.service';
import { OrderService } from './service/order.service';
import { PessimisticOrderService } from './service/pessimistic-order.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem, User, Item])],
  providers: [OrderService, PessimisticOrderService, OptimisticOrderService],
  controllers: [OrderController],
})
export class OrderModule {}
