import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ConfigKey } from 'src/global/const/config';
import { BlException } from 'src/global/exception/belab.exception';
import {
  ACCESS_TOKEN_PREFIX,
  ACCESS_TOKEN_SUBJECT,
  ACCESS_TOKEN_TTL,
  ACCESS_TOKEN_TYPE,
} from '../const/auth.const';
import { TokenUserDto } from '../dto/token-user.dto';
import { AuthError } from '../exception/auth.exception';
import { JwtPayloadType } from '../type/jwt.payload';

@Injectable()
export class JwtUtils {
  private readonly ACCESS_TOKEN_KEY: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.ACCESS_TOKEN_KEY = this.configService.get<string>(
      ConfigKey.ACCESS_TOKEN_KEY,
    );
  }

  public async createAccessToken(tokenUser: TokenUserDto) {
    const payload = {
      sub: ACCESS_TOKEN_SUBJECT,
      id: tokenUser.id,
      authority: tokenUser.authority,
      type: ACCESS_TOKEN_TYPE,
    };

    const token: string = await this.jwtService.signAsync(payload, {
      secret: this.ACCESS_TOKEN_KEY,
      expiresIn: ACCESS_TOKEN_TTL,
      algorithm: 'HS512',
    });

    return `${ACCESS_TOKEN_TYPE} ${token}`;
  }

  public async extractAccessTokenFromHeader(req: Request) {
    const token = req.headers['authorization']?.slice(
      ACCESS_TOKEN_PREFIX.length,
    );

    if (!token) {
      throw new BlException(AuthError.InvalidJwt);
    }

    return token;
  }

  public async verifyAccessTokenWithExpiration(token: string) {
    const payload: JwtPayloadType = await this.jwtService.verifyAsync(token, {
      secret: this.ACCESS_TOKEN_KEY,
      ignoreExpiration: false,
    });

    return await this.verifyAccessToken(payload);
  }

  public async verifyAccessTokenIgnoreExpiration(token: string) {
    const payload: JwtPayloadType = await this.jwtService.verifyAsync(token, {
      secret: this.ACCESS_TOKEN_KEY,
      ignoreExpiration: true,
    });

    return await this.verifyAccessToken(payload);
  }

  private async verifyAccessToken(payload: JwtPayloadType) {
    if (payload?.sub !== ACCESS_TOKEN_SUBJECT) {
      throw new BlException(AuthError.InvalidJwt);
    }
    if (payload?.type != ACCESS_TOKEN_TYPE) {
      throw new BlException(AuthError.InvalidJwt);
    }
    const userId = BigInt(payload.id);
    return new TokenUserDto(userId, payload.authority);
  }
}
