import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Users } from './Users';
import { Threads } from './Threads';

@Entity({ name: 'replies' })
export class Replies {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  content: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

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
