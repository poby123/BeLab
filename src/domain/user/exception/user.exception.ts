import { HttpStatus } from '@nestjs/common';
import { ErrorCode } from 'src/global/exception/code.exception';

export class UserError {
  static AlreadyExist = ErrorCode.create({
    status: HttpStatus.NOT_ACCEPTABLE,
    code: 'US001',
    message: '이미 존재하는 사용자입니다.',
  });

  static NotFound = ErrorCode.create({
    status: HttpStatus.NOT_FOUND,
    code: 'US002',
    message: '존재하지 않는 사용자입니다.',
  });
}
