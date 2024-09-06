import { Builder } from 'builder-pattern';
import { BaseEntity } from 'src/domain/common/entity/base.entity';
import { User } from 'src/domain/user/entity/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderItem } from './order-item.entity';

@Entity({ name: 'order' })
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'order_id', type: 'bigint' })
  id: bigint;

  @Column({ name: 'total_order_price' })
  originalTotalOrderPrice: number;

  /** relations */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: Promise<User>;

  @Column({ name: 'user_id' })
  userId: bigint;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItemList: OrderItem[];

  /** create */
  static create(user: User, orderItemList: OrderItem[]) {
    const originalTotalOrderPrice = orderItemList.reduce(
      (acc, item) => acc + Number(item.orderPrice) * Number(item.count),
      0,
    );

    return Builder(Order)
      .userId(user.id)
      .originalTotalOrderPrice(originalTotalOrderPrice)
      .orderItemList(orderItemList)
      .build();
  }
}
