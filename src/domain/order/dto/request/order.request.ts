import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { Item } from 'src/domain/item/entity/item.entity';
import { User } from 'src/domain/user/entity/user.entity';
import { Order } from '../../entity/order.entity';
import { OrderItemRequest } from './order-item.request';

export class OrderRequest {
  @ValidateNested({ each: true })
  @Type(() => OrderItemRequest)
  @IsArray()
  orderItemList: OrderItemRequest[];

  toEntity(user: User, itemList: Item[]) {
    const orderItemList = this.orderItemList.map((orderItem) => {
      const item = itemList.find((item) => item.id === orderItem.itemId);
      return orderItem.toEntity(item);
    });

    return Order.create(user, orderItemList);
  }
}
