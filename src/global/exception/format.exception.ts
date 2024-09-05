import { ValidationError } from '@nestjs/common';
import { BlException } from './belab.exception';
import { FieldError } from './field.exception';
import { GlobalError } from './global.exception';

export const formatErrors = (errors: Array<ValidationError>) => {
  const fieldErrors = errors.flatMap((m) => FieldError.of(m));
  const invalidRequestException = new BlException(
    GlobalError.BadRequest,
    fieldErrors,
  );

  return invalidRequestException;
};
