import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { Threads } from './Threads';
import { Replies } from './Replies';
import { Following } from './Following';
import { Likes } from './Likes';

@Entity({ name: 'users' })
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: true})
  username: string;

  @Column({nullable: true})
  fullName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({nullable: true})
  photo_profile: string

  @Column({nullable: true})
  background_profile: string

  @Column({nullable: true})
  bio: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
  
  @OneToMany(() => Threads, (threads) => threads.users, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  threads: Threads[]

  @OneToMany(() => Replies, (replies) => replies.users, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  replies: Replies[]

  @OneToMany(() => Likes, (likes) => likes.users, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })

  likes: Likes[]

  @OneToMany(() => Following, (following) => following.usersFollowing, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })

  following: Following[]

  @OneToMany(() => Following, (follower) => follower.usersFollower, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })

  follower: Following[]

}
