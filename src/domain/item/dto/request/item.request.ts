import { IsNotEmpty, IsNumber } from 'class-validator';
import { Item } from '../../entity/item.entity';

export class ItemRegisterRequest {
  @IsNotEmpty()
  name: string;

  @IsNumber()
  price: number;

  @IsNumber()
  stock: number;

  toEntity() {
    return Item.create({
      name: this.name,
      price: this.price,
      stock: this.stock,
    });
  }
}
