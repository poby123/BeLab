import { AUTHORITY } from 'src/domain/user/entity/role.enum';

export class LoginResponse {
  accessToken: string;
  refreshToken: string;
  authority?: string;

  constructor(accessToken: string, authority: AUTHORITY) {
    this.accessToken = accessToken;
    this.authority = authority;
  }
}
