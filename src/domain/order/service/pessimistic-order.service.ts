import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from 'src/domain/item/entity/item.entity';
import { ItemError } from 'src/domain/item/exception/item.exception';
import { User } from 'src/domain/user/entity/user.entity';
import { UserError } from 'src/domain/user/exception/user.exception';
import { BlException } from 'src/global/exception/belab.exception';
import { In, Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { OrderItemRequest } from '../dto/request/order-item.request';
import { OrderRequest } from '../dto/request/order.request';
import { OrderItem } from '../entity/order-item.entity';
import { Order } from '../entity/order.entity';
import { OrderError } from '../exception/order.exception';

@Injectable()
export class PessimisticOrderService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,

    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  @Transactional()
  public async order(userId: bigint, @Body() request: OrderRequest) {
    const user = await this.getUserOrThrow(userId);

    const { orderItemList: requestItemList } = request;
    const itemList = await this.getItemList(requestItemList);

    await this.validateItemStock(requestItemList, itemList);

    const savedOrder = await this.orderRepository.save(
      request.toEntity(user, itemList),
    );
    savedOrder.orderItemList.forEach(
      (orderItem) => (orderItem.orderId = savedOrder.id),
    );
    await this.orderItemRepository.save(savedOrder.orderItemList);
    await this.itemRepository.save(itemList);

    return savedOrder;
  }

  @Transactional()
  private async getUserOrThrow(userId: bigint) {
    return await this.userRepository
      .findOneByOrFail({ id: userId })
      .catch(() => {
        throw new BlException(UserError.NotFound);
      });
  }

  @Transactional()
  private async validateItemStock(
    requestItemList: OrderItemRequest[],
    itemList: Item[],
  ) {
    for (const requestItem of requestItemList) {
      const item = itemList.find((item) => item.id === requestItem.itemId);
      if (!item) {
        throw new BlException(ItemError.NotFound);
      }

      if (item.stock < requestItem.count) {
        throw new BlException(ItemError.NoStock);
      }

      if (item.price != requestItem.price) {
        throw new BlException(OrderError.IllegalItemPrice);
      }
    }
  }

  @Transactional()
  private async getItemList(requestItemList: OrderItemRequest[]) {
    return await this.itemRepository.find({
      where: {
        id: In(requestItemList.map((item) => item.itemId)),
      },
      lock: {
        mode: 'pessimistic_write',
      },
    });
  }
}
