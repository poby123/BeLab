import { Builder } from 'builder-pattern';

export class BlResponse {
  code?: string;
  message?: string;
  result: any;

  static create({
    code = '0',
    message = 'Success',
    result,
  }: Partial<BlResponse>) {
    return Builder(BlResponse)
      .code(code)
      .message(message)
      .result(result)
      .build();
  }
}
