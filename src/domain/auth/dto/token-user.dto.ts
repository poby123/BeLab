import { AUTHORITY } from 'src/domain/user/entity/role.enum';

export class TokenUserDto {
  id: number;
  authority: AUTHORITY;

  constructor(id: number, authority = AUTHORITY.ROLE_USER) {
    this.id = id;
    this.authority = authority;
  }
}
