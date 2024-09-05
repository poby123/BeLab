import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import { User } from 'src/domain/user/entity/user.entity';
import { BlException } from 'src/global/exception/belab.exception';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { LoginRequest } from '../dto/request/login.request';
import { LoginResponse } from '../dto/response/login.response';
import { TokenUserDto } from '../dto/token-user.dto';
import { AuthError } from '../exception/auth.exception';
import { JwtUtils } from './jwt.utils';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtUtils: JwtUtils,
  ) {}

  @Transactional()
  public async login(loginDto: LoginRequest) {
    const { email, password } = loginDto;
    const user = await this.userRepository.findOneOrFail({
      where: {
        email,
      },
    });

    const isPasswordEqual = await bcrypt.compare(password, user.password);
    if (!isPasswordEqual) {
      throw new BlException(AuthError.NotAuthenticated);
    }

    return await this.makeLogin(user);
  }

  private async makeLogin(user: User) {
    const tokenUser = new TokenUserDto(user.id, user.role);
    const accessToken = await this.jwtUtils.createAccessToken(tokenUser);

    return new LoginResponse(accessToken, user.role);
  }
}
