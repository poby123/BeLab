import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import { ConfigKey } from 'src/global/const/config';
import { BlException } from 'src/global/exception/belab.exception';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { SignUpRequest } from '../dto/request/user.request';
import { User } from '../entity/user.entity';
import { UserError } from '../exception/user.exception';

@Injectable()
export class UserService {
  private readonly SALT_ROUND: number;

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {
    this.SALT_ROUND = Number(
      this.configService.getOrThrow<number>(ConfigKey.SALT_ROUND),
    );
  }

  public async getUser(userId: number) {
    return await this.userRepository
      .findOneOrFail({ where: { id: userId } })
      .catch(() => {
        throw new BlException(UserError.NotFound);
      });
  }

  @Transactional()
  public async register(request: SignUpRequest) {
    const { email, password } = request;
    const user = await this.userRepository.findOneBy({ email });

    if (!!user) {
      throw new BlException(UserError.AlreadyExist);
    }

    const encryptedPassword = await bcrypt.hash(password, this.SALT_ROUND);
    await this.userRepository.save(request.toEntity(encryptedPassword));
  }
}
