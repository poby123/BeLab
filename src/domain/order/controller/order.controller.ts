import { Body, Controller, Get, Post } from '@nestjs/common';
import { SignedUser } from 'src/domain/auth/decorator/user.decorator';
import { TokenUserDto } from 'src/domain/auth/dto/token-user.dto';
import { OrderRequest } from '../dto/request/order.request';
import { OrderResponse } from '../dto/response/order.response';
import { OrderService } from '../service/order.service';

@Controller('/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('')
  public async getOrderList(@SignedUser() tokenUser: TokenUserDto) {
    const { id: userId } = tokenUser;
    const orderList = await this.orderService.getOrderList(userId);
    return await OrderResponse.fromArray(orderList);
  }

  @Post('')
  public async order(
    @SignedUser() tokenUser: TokenUserDto,
    @Body() request: OrderRequest,
  ) {
    const { id: userId } = tokenUser;
    const order = await this.orderService.order(userId, request);
    return order.id;
  }
}
