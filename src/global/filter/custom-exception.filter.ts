import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { BlException } from '../exception/belab.exception';

@Catch(BlException)
export class CustomExceptionFilter implements ExceptionFilter {
  constructor() {}

  async catch(exception: BlException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    const responseBody = exception.error;
    return response.status(responseBody.status).json(responseBody);
  }
}
