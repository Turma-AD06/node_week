import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { BaseEntity } from './base-entity';
import { Role } from './role.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable()
  roles: Role[];
}
