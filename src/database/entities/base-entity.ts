import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'created_at' })
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Column({ name: 'updated_at' })
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
