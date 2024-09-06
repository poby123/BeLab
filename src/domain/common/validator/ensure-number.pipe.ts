import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { BlException } from 'src/global/exception/belab.exception';
import { FieldError } from 'src/global/exception/field.exception';
import { GlobalError } from 'src/global/exception/global.exception';

@Injectable()
export class EnsureNumberPipe implements PipeTransform<number, number> {
  transform(value: number, metadata: ArgumentMetadata) {
    const { data } = metadata;

    try {
      BigInt(value);
    } catch (error) {
      const fieldError = new FieldError(data, value, '숫자타입이 아닙니다.');
      throw new BlException(GlobalError.BadRequest, [fieldError]);
    }

    return value;
  }
}
