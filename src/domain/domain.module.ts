import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ItemModule } from './item/item.module';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [UserModule, AuthModule, ItemModule, OrderModule],
})
export class DomainModule {}
