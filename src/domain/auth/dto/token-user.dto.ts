import { AUTHORITY } from 'src/domain/user/entity/role.enum';

export class TokenUserDto {
  id: bigint;
  authority: AUTHORITY;

  constructor(id: bigint, authority = AUTHORITY.ROLE_USER) {
    this.id = id;
    this.authority = authority;
  }
}
