import { Builder } from 'builder-pattern';
import { Item } from '../../entity/item.entity';

export class ItemResponse {
  id: bigint;
  name: string;
  stock: number;
  price: number;

  static from(item: Item) {
    return Builder(Item)
      .id(item.id)
      .name(item.name)
      .stock(item.stock)
      .price(item.price)
      .build();
  }

  static fromArray(itemList: Item[]) {
    const result: ItemResponse[] = [];
    for (const item of itemList) {
      result.push(ItemResponse.from(item));
    }
    return result;
  }
}
