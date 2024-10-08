import { Builder } from 'builder-pattern';
import { BaseEntity } from 'src/domain/common/entity/base.entity';
import { BlException } from 'src/global/exception/belab.exception';
import { Column, Entity, PrimaryGeneratedColumn, VersionColumn } from 'typeorm';
import { ItemError } from '../exception/item.exception';

@Entity({ name: 'item' })
export class Item extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'item_id', type: 'bigint' })
  id: bigint;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'price' })
  price: number;

  @Column({ name: 'stock' })
  stock: number;

  @VersionColumn()
  version: number;

  /** values */
  enableOptimistic: boolean = false; // 낙관적 락을 선택적으로 활성화하기 위한 필드

  /** create */
  static create({
    name,
    price,
    stock,
  }: Pick<Item, 'name' | 'price' | 'stock'>) {
    return Builder(Item).name(name).price(price).stock(stock).build();
  }

  /** functional */
  public removeStock(count: number) {
    if (this.stock < count) {
      throw new BlException(ItemError.NoStock);
    }
    this.stock -= count;
  }

  public addStock(count: number) {
    this.stock += count;
  }
}
