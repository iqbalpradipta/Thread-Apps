import { createSlice } from '@reduxjs/toolkit';
import { IThreads, IThreadsPost } from '../../types/threadsInterface';

const initialThreadSlice: IThreads[] = [];

const initialPostThreadSlice: IThreadsPost = {
  content: '',
  image: null,
};

const initialDetailSlice: { data: IThreads } = {
  data: {
    id: 0,
    content: '',
    created_at: '',
    image: '',
    number_of_replies: 0,
    number_of_likes: 0,
    isLikes: false,
    users: {
      username: '',
      fullName: '',
      email: '',
      followingNumber: 0,
      followerNumber: 0
    },
  },
};

export const threadPostSlice = createSlice({
  name: 'threads',
  initialState: initialPostThreadSlice,
  reducers: {
    POST_THREAD: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const threadDetailSlice = createSlice({
  name: 'threads',
  initialState: initialDetailSlice,
  reducers: {
    GET_DETAIL: (state, action) => {
      state.data = action.payload
    },
  },
});

export const threadSlice = createSlice({
  name: 'threads',
  initialState: initialThreadSlice,
  reducers: {
    GET_THREAD: (_, action) => {
      const payload = action.payload;

      const threads: IThreads[] = payload.map((data: IThreads) => {
        return {
          id: data.id,
          content: data.content,
          image: data.image,
          number_of_replies: data.number_of_replies,
          number_of_likes: data.number_of_likes,
          created_at: data.created_at,
          users: data.users,
        };
      });
      return threads;
    },
  },
});
