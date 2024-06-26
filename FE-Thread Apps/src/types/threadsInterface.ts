import { IReply } from './replyInterface';

export interface IThreads {
  id?: number;
  content?: string;
  created_at?: string;
  image?: string;
  number_of_replies?: number;
  number_of_likes: number;
  isLikes?: boolean
  users?: IUsers;
  replies?: IReply;
}

export interface IUsers {
  id?: number;
  username?: string;
  fullName?: string;
  email?: string;
  bio?: string;
  photo_profile?: string;
  background_profile?: string;
  followingNumber?: number;
  followerNumber?: number;
}

export interface IThreadsPost {
  content?: string;
  image?: FileList | null;
}
