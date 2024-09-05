import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-custom';
import { BlException } from 'src/global/exception/belab.exception';
import { AuthError } from '../exception/auth.exception';
import { JwtUtils } from '../service/jwt.utils';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly jwtUtils: JwtUtils) {
    super();
  }

  async validate(req: Request) {
    try {
      const token = await this.jwtUtils.extractAccessTokenFromHeader(req);
      const user = await this.jwtUtils.verifyAccessTokenWithExpiration(token);

      return user;
    } catch (error) {
      if (error instanceof BlException) {
        throw error;
      }
      if (error?.message === 'jwt expired') {
        throw new BlException(AuthError.ExpiredJwt);
      }
      throw new BlException(AuthError.InvalidJwt);
    }
  }
}
