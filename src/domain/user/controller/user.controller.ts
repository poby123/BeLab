import { Body, Controller, Get, Post } from '@nestjs/common';
import { Public } from 'src/domain/auth/decorator/public.decorator';
import { SignedUser } from 'src/domain/auth/decorator/user.decorator';
import { TokenUserDto } from 'src/domain/auth/dto/token-user.dto';
import { SignUpRequest } from '../dto/request/user.request';
import { UserProfileResponse } from '../dto/response/user.response';
import { UserService } from '../service/user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public async getProfile(@SignedUser() tokenUser: TokenUserDto) {
    const { id: userId } = tokenUser;
    const user = await this.userService.getUser(userId);
    return UserProfileResponse.from(user);
  }

  @Public()
  @Post()
  public async register(@Body() request: SignUpRequest) {
    await this.userService.register(request);
  }
}
