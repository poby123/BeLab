import { HttpException } from '@nestjs/common';
import { ErrorCode } from './code.exception';
import { FieldError } from './field.exception';
import { ErrorResponse } from './response.exception';

export class BlException extends HttpException {
  error: ErrorResponse;

  constructor(error: ErrorCode, errors?: Array<FieldError>) {
    super(ErrorResponse.from(error, errors), error.status);
    this.error = ErrorResponse.from(error, errors);
  }
}
