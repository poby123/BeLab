import { HttpStatus } from '@nestjs/common';
import { ErrorCode } from 'src/global/exception/code.exception';

export class AuthError {
  static readonly InvalidJwt = ErrorCode.create({
    status: HttpStatus.UNAUTHORIZED,
    message: '잘못된 토큰입니다.',
    code: 'AU001',
  });

  static readonly ExpiredJwt = ErrorCode.create({
    status: HttpStatus.UNAUTHORIZED,
    message: '만료된 토큰입니다.',
    code: 'AU002',
  });

  static readonly NotAuthenticated = ErrorCode.create({
    status: HttpStatus.NOT_ACCEPTABLE,
    message: '인증정보가 올바르지 않습니다.',
    code: 'AU003',
  });
}
