import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigKey } from 'src/global/const/config';
import { User } from '../user/entity/user.entity';
import { ACCESS_TOKEN_TTL } from './const/auth.const';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { JwtUtils } from './service/jwt.utils';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.registerAsync({
      global: true,
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>(ConfigKey.ACCESS_TOKEN_KEY),
        signOptions: {
          expiresIn: ACCESS_TOKEN_TTL,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [JwtUtils, JwtStrategy, AuthService],
  exports: [PassportModule, JwtUtils],
})
export class AuthModule {}
