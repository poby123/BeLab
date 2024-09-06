import { Builder } from 'builder-pattern';
import { OrderItem } from '../../entity/order-item.entity';

export class OrderItemResponse {
  id: bigint;
  count: number;
  orderPrice: number;

  itemId: bigint;
  name: string;

  static async from(orderItem: OrderItem) {
    const item = await orderItem.item;
    return Builder(OrderItemResponse)
      .id(orderItem.id)
      .count(orderItem.count)
      .orderPrice(orderItem.orderPrice)
      .itemId(item.id)
      .name(item.name)
      .build();
  }

  static async fromArray(orderItemList: OrderItem[]) {
    const result: OrderItemResponse[] = [];
    for (const orderItem of orderItemList) {
      result.push(await OrderItemResponse.from(orderItem));
    }
    return result;
  }
}
