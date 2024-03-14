import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, UpdateDateColumn } from 'typeorm';
import { Users } from './Users';

@Entity({ name: 'following' })
export class Following {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, (users) => users.following, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  usersFollowing: Users

  @ManyToOne(() => Users, (users) => users.follower, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  usersFollower: Users


  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
