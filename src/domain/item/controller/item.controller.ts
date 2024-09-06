import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Public } from 'src/domain/auth/decorator/public.decorator';
import { EnsureNumberPipe } from 'src/domain/common/validator/ensure-number.pipe';
import { ItemRegisterRequest } from '../dto/request/item.request';
import { ItemResponse } from '../dto/response/item.response';
import { ItemService } from '../service/item.service';

@Controller('/item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Public()
  @Post('')
  public async registerItem(@Body() request: ItemRegisterRequest) {
    await this.itemService.register(request);
  }

  @Public()
  @Get()
  public async getItemList() {
    const itemList = await this.itemService.getList();
    console.log('item list: ', itemList);
    return ItemResponse.fromArray(itemList);
  }

  @Public()
  @Get('/:itemId')
  public async getItem(@Param('itemId', EnsureNumberPipe) itemId: bigint) {
    const item = await this.itemService.get(itemId);
    return ItemResponse.from(item);
  }
}
