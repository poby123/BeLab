import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlException } from 'src/global/exception/belab.exception';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { ItemRegisterRequest } from '../dto/request/item.request';
import { Item } from '../entity/item.entity';
import { ItemError } from '../exception/item.exception';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item) private readonly itemRepository: Repository<Item>,
  ) {}

  public async get(itemId: bigint) {
    return await this.itemRepository
      .findOne({
        where: {
          id: itemId,
        },
      })
      .catch(() => {
        throw new BlException(ItemError.NotFound);
      });
  }

  public async getList() {
    return await this.itemRepository.find({});
  }

  @Transactional()
  public async register(request: ItemRegisterRequest) {
    await this.itemRepository.save(request.toEntity());
  }
}
