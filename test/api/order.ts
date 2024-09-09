import { OrderItemRequest } from 'src/domain/order/dto/request/order-item.request';
import { authClient, publicClient } from '../config';

export class OrderApi {
  static async order(_request: Partial<OrderItemRequest>[]) {
    const request = { orderItemList: _request };
    await authClient.post('/order', request);
  }

  static async orderPessimistic(_request: Partial<OrderItemRequest>[]) {
    const request = { orderItemList: _request };
    await authClient.post('/order/pessimistic', request);
  }

  static async orderOptimistic(_request: Partial<OrderItemRequest>[]) {
    const request = { orderItemList: _request };
    await authClient.post('/order/optimistic', request);
  }

  static async getOrderList() {
    const { data } = await authClient.get('/order');
    return data.result;
  }

  static async reset() {
    await publicClient.post('/order/reset');
  }
}
