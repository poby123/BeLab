import { Builder } from 'builder-pattern';
import { BaseEntity } from 'src/domain/common/entity/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AUTHORITY } from './role.enum';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'user_id', type: 'bigint' })
  id: bigint;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'authority', default: AUTHORITY.ROLE_USER })
  role: AUTHORITY;

  /** create */
  static create({
    email,
    name,
    password,
    role,
  }: Pick<User, 'email' | 'name' | 'password'> & Partial<User>) {
    return Builder(User)
      .email(email)
      .name(name)
      .password(password)
      .role(role)
      .build();
  }
}
