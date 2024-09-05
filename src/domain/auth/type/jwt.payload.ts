import { AUTHORITY } from 'src/domain/user/entity/role.enum';

export interface JwtPayloadType {
  sub: string;
  id: string;
  authority: AUTHORITY;
  type: string;
  iat: 1685498695;
  exp: 1685502295;
}
