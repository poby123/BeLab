import { Body, Controller, Get, Post } from '@nestjs/common';
import { Public } from 'src/domain/auth/decorator/public.decorator';
import { SignedUser } from 'src/domain/auth/decorator/user.decorator';
import { TokenUserDto } from 'src/domain/auth/dto/token-user.dto';
import { OrderRequest } from '../dto/request/order.request';
import { OrderResponse } from '../dto/response/order.response';
import { OptimisticOrderService } from '../service/optimistic-order.service';
import { OrderService } from '../service/order.service';
import { PessimisticOrderService } from '../service/pessimistic-order.service';

@Controller('/order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly pessimisticOrderService: PessimisticOrderService,
    private readonly optimisticOrderService: OptimisticOrderService,
  ) {}

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

  @Post('/optimistic')
  public async orderOptimistic(
    @SignedUser() tokenUser: TokenUserDto,
    @Body() request: OrderRequest,
  ) {
    const { id: userId } = tokenUser;
    const order = await this.optimisticOrderService.order(userId, request);
    return order.id;
  }

  @Post('/pessimistic')
  public async orderPessimistic(
    @SignedUser() tokenUser: TokenUserDto,
    @Body() request: OrderRequest,
  ) {
    const { id: userId } = tokenUser;
    const order = await this.pessimisticOrderService.order(userId, request);
    return order.id;
  }

  @Public()
  @Post('reset')
  public async reset() {
    await this.orderService.reset();
  }
}
