import { Controller, Get } from '@nestjs/common';
import { BlException } from './global/exception/belab.exception';
import { GlobalError } from './global/exception/global.exception';

@Controller()
export class AppController {
  @Get('')
  public async hello() {
    return 'hello!';
  }

  @Get('/error')
  public async error() {
    throw new BlException(GlobalError.InternalServerError);
  }
}
