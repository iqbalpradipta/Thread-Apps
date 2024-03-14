import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, UpdateDateColumn, OneToMany, JoinColumn } from 'typeorm';
import { Users } from './Users';
import { Replies } from './Replies';
import { Likes } from './Likes';

@Entity({ name: 'threads' })
export class Threads {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  content: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  isLikes: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Users, (users) => users.threads, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  users: Users;

  @OneToMany(() => Replies, (replies) => replies.threads, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  replies: Replies[];

  @OneToMany(() => Likes, (likes) => likes.threads, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })

  likes: Likes[]
}
