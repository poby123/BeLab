import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DomainModule } from './domain/domain.module';
import { GlobalModule } from './global/global.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';

@Module({
  imports: [InfrastructureModule, GlobalModule, DomainModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
