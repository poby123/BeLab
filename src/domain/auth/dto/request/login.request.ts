import { IsNotEmpty, IsString } from 'class-validator';

export class LoginRequest {
  @IsString({ message: '문자열이 아닙니다.' })
  @IsNotEmpty({ message: '빈 값이 허용되지 않습니다.' })
  email: string;

  @IsNotEmpty({ message: '빈 값이 허용되지 않습니다.' })
  password: string;
}
