import { Builder } from 'builder-pattern';
import { BaseEntity } from 'src/domain/common/entity/base.entity';
import { Item } from 'src/domain/item/entity/item.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entity';

@Entity({ name: 'order_item' })
export class OrderItem extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'order_item_id', type: 'bigint' })
  id: bigint;

  @Column({ name: 'order_price' })
  orderPrice: number;

  @Column({ name: 'count' })
  count: number;

  /** relations */
  @ManyToOne(() => Order)
  @JoinColumn({ name: 'order_id' })
  order: Promise<Order>;

  @Column({ type: 'bigint', name: 'order_id', nullable: true })
  orderId: bigint;

  @ManyToOne(() => Item)
  @JoinColumn({ name: 'item_id' })
  item: Promise<Item>;

  @Column({ type: 'bigint', name: 'item_id', nullable: true })
  itemId: bigint;

  /** create */
  static create(item: Item, orderPrice: number, count: number) {
    item.removeStock(count);

    return Builder(OrderItem)
      .itemId(item.id)
      .orderPrice(orderPrice)
      .count(count)
      .build();
  }
}
