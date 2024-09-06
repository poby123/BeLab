import { Builder } from 'builder-pattern';
import { Order } from '../../entity/order.entity';
import { OrderItemResponse } from './order-item.response';

export class OrderResponse {
  id: bigint;
  originalTotalOrderPrice: number;
  itemList: OrderItemResponse[];

  static async from(order: Order) {
    return Builder(OrderResponse)
      .id(order.id)
      .originalTotalOrderPrice(order.originalTotalOrderPrice)
      .itemList(await OrderItemResponse.fromArray(order.orderItemList))
      .build();
  }

  static async fromArray(orderList: Order[]) {
    const result: OrderResponse[] = [];
    for (const order of orderList) {
      result.push(await OrderResponse.from(order));
    }
    return result;
  }
}
