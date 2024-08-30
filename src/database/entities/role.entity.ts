import { Column, Entity, ManyToMany, Unique } from 'typeorm';
import { BaseEntity } from './base-entity';
import { User } from './user.entity';

@Entity({ name: 'roles' })
@Unique(['name'])
export class Role extends BaseEntity {
  @Column()
  name: string;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
