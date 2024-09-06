import { Builder } from 'builder-pattern';
import { User } from '../../entity/user.entity';

export class UserProfileResponse {
  id: bigint;
  name: string;
  email: string;

  static from(user: User) {
    return Builder(UserProfileResponse)
      .id(user.id)
      .name(user.name)
      .email(user.email)
      .build();
  }
}
