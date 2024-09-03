import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base-entity';
import { User } from './user.entity';

@Entity({ name: 'products' })
export class Product extends BaseEntity {
  @Column()
  name: string;
  @Column({ nullable: true })
  description: string;
  @Column()
  price: number;
  @Column({ nullable: true })
  image: string;
  @Column('decimal', { precision: 10, scale: 2 })
  score: number;

  @ManyToOne(() => User, (user) => user.products)
  @JoinColumn()
  user: User;
}
