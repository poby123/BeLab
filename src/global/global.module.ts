import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { CustomExceptionFilter } from './filter/custom-exception.filter';
import { GlobalExceptionFilter } from './filter/global-exception.filter';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { ResponseInterceptor } from './interceptor/response.interceptor';

@Module({
  imports: [],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
    { provide: APP_FILTER, useClass: GlobalExceptionFilter },
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_FILTER, useClass: CustomExceptionFilter },
  ],
  exports: [],
})
export class GlobalModule {}
