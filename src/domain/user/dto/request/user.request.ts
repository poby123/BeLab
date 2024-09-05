import { IsEmail, IsNotEmpty } from 'class-validator';
import { User } from '../../entity/user.entity';

export class SignUpRequest {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  toEntity(encryptedPassword: string) {
    return User.create({
      name: this.name,
      email: this.email,
      password: encryptedPassword,
    });
  }
}
