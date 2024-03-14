import { IThreads, IUsers } from './threadsInterface';

export interface IReply {
  id?: number;
  content: string;
  image: string
  created_at: string;
  users: IUsers;
  replies: IReplyDetail[];
}

export interface IReplyDetail {
  id?: number;
  content: string;
  image: string;
}

export interface IReplyPost {
  id?: number;
  content?: string;
  image?: FileList | null;
  created_at?: string
}
