import { IsNumber, IsNumberString, Min } from 'class-validator';
import { Item } from 'src/domain/item/entity/item.entity';
import { OrderItem } from '../../entity/order-item.entity';

export class OrderItemRequest {
  @IsNumberString()
  itemId: bigint | string;

  @IsNumber()
  price: number;

  @Min(1)
  @IsNumber()
  count: number;

  toEntity(item: Item) {
    return OrderItem.create(item, this.price, this.count);
  }
}
