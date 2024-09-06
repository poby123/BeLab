import { ItemRegisterRequest } from 'src/domain/item/dto/request/item.request';
import { authClient } from './config';

export class ItemTest {
  static async register(request: Partial<ItemRegisterRequest>) {
    const { data } = await authClient.post('/item', request);
    return data;
  }

  static async getList() {
    const { data } = await authClient.get('/item');
    return data;
  }
}
