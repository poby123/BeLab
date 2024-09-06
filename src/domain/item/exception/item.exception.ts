import { HttpStatus } from '@nestjs/common';
import { ErrorCode } from 'src/global/exception/code.exception';

export class ItemError {
  static NotFound = ErrorCode.create({
    status: HttpStatus.NOT_FOUND,
    code: 'IT001',
    message: '존재하지 않는 상품입니다.',
  });

  static NoStock = ErrorCode.create({
    status: HttpStatus.NOT_ACCEPTABLE,
    code: 'IT002',
    message: '재고가 부족합니다.',
  });
}
