import { HttpStatus } from '@nestjs/common';
import { Builder } from 'builder-pattern';

export class ErrorCode {
  status: HttpStatus;
  code: string;
  message: string;

  static create({
    status,
    code,
    message,
  }: Pick<ErrorCode, 'status' | 'code' | 'message'>) {
    return Builder(ErrorCode)
      .status(status)
      .code(code)
      .message(message)
      .build();
  }
}
