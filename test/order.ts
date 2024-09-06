import { OrderItemRequest } from 'src/domain/order/dto/request/order-item.request';
import { authClient } from './config';

export class OrderTest {
  static async order(_request: Partial<OrderItemRequest>[]) {
    try {
      const request = { orderItemList: _request };
      console.log(request);
      await authClient.post('/order', request);
    } catch (error) {
      console.log(error.response.data);
    }
  }

  static async getOrderList() {
    const { data } = await authClient.get('/order');
    return data.result;
  }
}
