import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base-entity';
import { User } from './user.entity';

@Entity({ name: 'products' })
export class Product extends BaseEntity {
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  price: number;
  @Column()
  image: string;
  @Column()
  score: number;

  @ManyToOne(() => User, (user) => user.products)
  @JoinColumn()
  user: User;
}
