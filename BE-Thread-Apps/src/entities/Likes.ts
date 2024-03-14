import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, UpdateDateColumn } from 'typeorm';
import { Users } from './Users';
import { Threads } from './Threads';

@Entity({ name: 'likes' })
export class Likes {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  update_at: Date;

  @ManyToOne(() => Users, (users) => users.replies, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  users: Users

  @ManyToOne(() => Threads, (threads) => threads.replies, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  threads: Threads
}
