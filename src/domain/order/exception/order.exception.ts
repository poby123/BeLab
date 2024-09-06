import { HttpStatus } from '@nestjs/common';
import { ErrorCode } from 'src/global/exception/code.exception';

export class OrderError {
  static IllegalItemPrice = ErrorCode.create({
    status: HttpStatus.NOT_ACCEPTABLE,
    code: 'OR001',
    message: '잘못된 가격입니다.',
  });
}
