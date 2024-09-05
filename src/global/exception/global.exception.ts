import { HttpStatus } from '@nestjs/common';
import { ErrorCode } from './code.exception';

export class GlobalError {
  static readonly InternalServerError = ErrorCode.create({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    code: 'GL001',
    message: '서버에러입니다.',
  });

  static readonly BadRequest = ErrorCode.create({
    status: HttpStatus.BAD_REQUEST,
    code: 'GL002',
    message: '잘못된 요청입니다.',
  });
}
