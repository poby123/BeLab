import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigKey } from 'src/global/const/config';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { OptimisticLockingSubscriber } from './subscriber';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>(ConfigKey.MYSQL_HOST),
        port: configService.get<number>(ConfigKey.MYSQL_PORT),
        username: configService.get<string>(ConfigKey.MYSQL_ROOT_USERNAME),
        password: configService.get<string>(ConfigKey.MYSQL_ROOT_PASSWORD),
        database: configService.get<string>(ConfigKey.MYSQL_DATABASE),
        synchronize: true,
        autoLoadEntities: true,
        logging: false,
        entities: ['dist/**/*.entity.js'],
        subscribers: [OptimisticLockingSubscriber],
        timezone: 'Z',
      }),
      dataSourceFactory: async (options) => {
        return addTransactionalDataSource(new DataSource(options));
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
