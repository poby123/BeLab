import { Body, Controller, Post } from '@nestjs/common';
import { Public } from '../decorator/public.decorator';
import { LoginRequest } from '../dto/request/login.request';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/login')
  public async login(@Body() loginRequestDto: LoginRequest) {
    return await this.authService.login(loginRequestDto);
  }
}
